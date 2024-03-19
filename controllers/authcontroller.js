const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createJWTToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSECRET);
};

exports.login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      err: err,
      message: "Email or password are required",
    });
  }
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );

    const bcryptresponse = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!user || !bcryptresponse) {
      return res.status(400).json({
        message: "incorrect login details ",
      });
    }

    const token = createJWTToken(user.id);
    return res.status(200).json({
      data: user,
      token: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      err: err,
      message: "Unable to login",
    });
  }
};

exports.signup = async (req, res, next) => {
  // hashpassword
  try {
    const password = await bcrypt.hash(req.body.password, 12);
    const user = await User.create({
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      password: password,
    });

    // create Token
    const token = createJWTToken(user.id);
    return res.status(200).json({
      data: user,
      token: token,
    });
  } catch (err) {
    console.log(err);
    if (err?.index == 0) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    return res.status(400).json({
      err: err,
      message: "Unable to Signup",
    });
  }
};
