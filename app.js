const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authrouter = require("./routers/authrouter");
const pharmercyrouter = require("./routers/pharmrouter");
const drugsrouter = require("./routers/drugsrouter");
const userRouter = require("./routers/userRouter")

const app = express();

app.use(cors());

// console.log(process.env.MONGODB);
// MIDDLEWARES
// app.use("", (req, res, next) => {
//   res.send("Hi , cors testing ");
// });
// app.use(express.static());
app.use(express.json());

app.use("/api/v1/auth", authrouter);
app.use('/api/v1/user', userRouter)
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

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log("listening");
});
