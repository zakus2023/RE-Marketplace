import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import bcrypt from "bcrypt";
import User from "./models/user.model.js";
import { errorHandler } from "./utils/error.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { verifyToken } from "./utils/verifyUser.js";
import Listing from "./models/listing.models.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(3000, () => {
  console.log("App litening on port 3000");
});

//...........................................................................................
//Signup api
//...........................................................................................
app.post("/api/signup", async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(200).json("User created successfully");
  } catch (error) {
    //res.status(500).json(error.message);
    next(error);
  }
});

//..........................................................................................
//Signin api
//..........................................................................................
app.post("/api/signin", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(401, "User not found"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(400, "Wrong credentials"));
    //signing the token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRETS);
    //remove the password from the data that will be stored in the cokies
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { hashOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
});

//................................................................................
//Google click api
//................................................................................
app.post("/api/google", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETS);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { hashOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRETS);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { hashOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
});

//................................................................................
//Update user api
//................................................................................
app.post("/api/update/:id", verifyToken, async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(
      errorHandler(401, "You are unauthorized to update this profile")
    );
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
});

//...............................................................................
//Delete user api
//...............................................................................
app.delete("/api/deleteUser/:id", verifyToken, async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(403, "Unauthorized"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted successfully");
  } catch (error) {
    next(error);
  }
});

//..............................................................................
//Signout user api
//..............................................................................
app.get("/api/signout", (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("You signed out successfully");
  } catch (error) {
    next(error);
  }
});

//...............................................................................
//create listing api
//...............................................................................
app.post("/api/createListing/", verifyToken, async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
});

//................................................................................
//Show user listing api
//................................................................................
app.get("/api/userlisting/:id", verifyToken, async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listing = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listing);
    } catch (error) {
      next(error);
    }
  }
});

//...............................................................................
//Delete listing api
//...............................................................................
app.delete("/api/deletelisting/:id", verifyToken, async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(402, "Listing not found"));
  }
  if (req.user.id !== listing.userRef) {
    return next(
      errorHandler(403, "You are unathorized to delete this listing")
    );
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing deleted successfully");
  } catch (error) {
    next(error);
  }
});

//...............................................................................
//Get particular listing api
//...............................................................................
app.get("/api/get/:id", async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(403, "Listing not found"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
});

//................................................................................
//Update listing api
//................................................................................
app.post("/api/update-listing/:id", verifyToken, async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(401, "User not found"));
  if (req.user.id !== listing.userRef)
    return next(errorHandler(402, "You can only update your listing"));
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
});

//...............................................................................
//fetch a particular user
//...............................................................................

app.get("/api/user/:id", verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(402, "User not found"));
    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
});

//................................................................................
// Error handling middleware
//................................................................................
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
