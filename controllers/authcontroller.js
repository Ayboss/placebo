const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceid = process.env.TWILLO_SERVICE_ID;

// console.log(accountSid, authToken, serviceid);
const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const client = require("twilio")(accountSid, authToken);

const createJWTToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSECRET);
};

const sendTwilloSMSOTP = async (phonenumber) => {
  try {
    const verification = await client.verify.v2
      .services(serviceid)
      .verifications.create({ to: phonenumber, channel: "sms" });

    return verification;
  } catch (err) {
    throw err;
  }
};

const verifyTwilloSMSOTP = async (phonenumber, otp) => {
  try {
    const verificationcheck = client.verify.v2
      .services(serviceid)
      .verificationChecks.create({ to: phonenumber, code: otp });

    return verificationcheck;
  } catch (err) {
    throw err;
  }
};

exports.login = async (req, res) => {
  if (!req.body.phoneOrEmail || !req.body.password) {
    return res.status(400).json({
      err: err,
      message: "Email or password are required",
    });
  }

  try {

    const user = await User.findOne({ 
      $or: [ 
        { email: req.body.phoneOrEmail}, 
        { phonenumber: req.body.phoneOrEmail} 
          ]  
      }).select("+password");

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({
        message: "incorrect login details ",
      });
    }
    const token = createJWTToken(user.id);
    user.password = undefined;
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
    // Validation takes place in the model 
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

exports.resendSMSOTP = async (req, res) => {
  try {
    const response = await sendTwilloSMSOTP("+2348035034968");
    console.log(response);
    return res.status(200).json({
      status: "success",
      message: response,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "error",
      err: err,
    });
  }
};

exports.verifySMSOTP = async (req, res) => {
  const otp = req.body.otp;
  const phonenumber = req.body.phonenumber;
  if (!otp) {
    return res.status(400).json({
      message: "OTP required failed",
    });
  }

  verifyTwilloSMSOTP(phonenumber, otp);
};
