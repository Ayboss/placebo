const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authrouter = require("./routers/authrouter");
const pharmercyrouter = require("./routers/pharmrouter");

const app = express();

// console.log(process.env.MONGODB);

app.use(express.json());
app.use("/api/v1/auth", authrouter);
app.use("/api/v1/pharmacy", pharmercyrouter);

mongoose
  .connect(process.env.MONGODB)
  .then((res) => {
    console.log("CONNECTION MADE");
  })
  .catch((err) => {
    console.log(err);
  });
const server = app.listen(3000, () => {
  console.log("listening");
});
