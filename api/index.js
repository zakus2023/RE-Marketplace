import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";


const app = express();

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


// test api
// .........................................................................................

app.get('/', (req, res)=>{
  res.json({
    name:"Abdul"
  })
})

