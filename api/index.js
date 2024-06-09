import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import bcrypt from "bcrypt";
import User from "./models/user.model.js";
import { errorHandler } from "./utils/error.js";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

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
    if (!validPassword) return next(400, "Wrong credentials");
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
