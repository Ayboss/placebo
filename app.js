const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authrouter = require("./routers/authrouter");
const pharmercyrouter = require("./routers/pharmrouter");
const drugsrouter = require("./routers/drugsrouter");

const app = express();

// console.log(process.env.MONGODB);
// MIDDLEWARES
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authrouter);
app.use("/api/v1/pharmacy", pharmercyrouter);
app.use("/api/v1/drugs", drugsrouter);

mongoose
  .connect(process.env.MONGODB)
  .then((res) => {
    console.log("CONNECTION MADE");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log("listening");
});
