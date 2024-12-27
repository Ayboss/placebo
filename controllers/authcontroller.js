const {promisify} = require('util');
const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Email = require("../utils/email");
const createOTP = require("../utils/createOTP");

const createJWTToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSECRET);
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
    if(!user.verified){
      return res.status(400).json({
        message: "User is not verified, please verify user",
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

exports.signup = async (req, res) => {
  // hashpassword
  try {
    const password = await bcrypt.hash(req.body.password, 12);
    // Validation takes place in the model 
    const {otp, otpCreatedAt} = createOTP()
    
    const user = await User.create({
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      password: password,
      otp,
      otpCreatedAt
    });
    
    await new Email(user).sendOtp(otp)
    // send email and otp
    // create Token
    const token = createJWTToken(user.id);

    user.password = undefined
    user.otp = undefined
    user.otpCreatedAt = undefined
    
    return res.status(200).json({
      data: user,
      token: token,
      message: "OTP sent, and would expire in 30mins"
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

exports.verifyOtp = async (req, res) => {
  try {  
    const user = await User.findById(req.user.id).select("+otp")
    if(user.verified){
      return res.status(400).json({
        message: "Account is already verified"
      })
    }
    
    if (user.otp.toLowerCase() !== req.body.otp.toLowerCase()){
      return res.status(400).json({
        message: "Wrong OTP"
      })
    }
    
    if(Date.now() > user.otpCreatedAt){
      return res.status(400).json({
        message: "OTP has expired"
      })
    }
    
    await User.findByIdAndUpdate(user.id, {verified: true,otp:'' })
    req.user.verified = true
    res.status(400).json({
      message: "User is verified",
      data: req.user
    });
  } catch (err) {
    console.log("IN VERIFY")
    res.status(400).json({
      message: "error",
      err: err,
    });
  }
};

exports.forgetpassword = async (req, res)=>{
  
}

exports.resendOTP = async (req, res) => {
  try {
    if(req.user.verified){
      return res.status(400).json({
        message: "Account is already verified"
      })
    }
    const {otp, otpCreatedAt} = createOTP()
     
    const user = await User.findByIdAndUpdate(req.user.id, {
      otp,
      otpCreatedAt
    });
    
    await new Email(user).sendOtp(otp)

    return res.status(200).json({
      status: "success",
      message: "OTP sent, and would expire in 30mins",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "error",
      err: err,
    });
  }
};

exports.protect = async (req,res,next)=>{
  try{
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1]
    
  }
  if(!token){
    return res.status(401).json({message:'Please login to acess this route'})
  }


  //verify token;
  const decode = await promisify(jwt.verify)(token,process.env.JWTSECRET)
  // return res.status(200).json({message:"hiihihihihihhi", token})
  
  //check if user still exits
  const currentUser = await User.findById(decode.id);
  if(!currentUser){
    return res.status(401).json({message:'User with token does not exit'})
  }
  //check if password hasnt been changed since the token was made..
  // if(currentUser.isPasswordChanged(decode.iat)){
    //   return res.status(401).json({message:'User recently changed password.. Login in again'})
    // };
    req.user = currentUser;
    // res.locals.user = currentUser;
    next();
  }catch(err){
    console.log("IN Process")
    res.status(400).json({
      message: "error",
      err: err,
    });
  }
}
