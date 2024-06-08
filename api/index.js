import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import bcrypt from 'bcrypt'
import User from "./models/user.model.js";
 


const app = express();
app.use(express.json())

dotenv.config();

mongoose
  .connect(
    process.env.MONGO
  )
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(3000, () => {
  console.log("App litening on port 3000");
});


//Signup api
//...........................................................................................
app.post('/api/signup', async (req,res)=>{
  const {username, email, password} = req.body
  const hashedPassword = bcrypt.hashSync(password, 10)
  const newUser = new User({username, email, password: hashedPassword})
  try {
    await newUser.save()
    res.status(200).json("User created successfully")
  } catch (error) {
    res.status(500).json(error.message)
  }
})