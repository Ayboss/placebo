const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  lastname: {
    type: String,
    required: [true, "Last Name is required"],
  },
  firstname: {
    type: String,
    required: [true, "First Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },
  phonenumber: {
    type: String,
    required: [true, "Phone Number is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: 8,
    select: false,
  },
});

module.exports = mongoose.model("User", userschema);
