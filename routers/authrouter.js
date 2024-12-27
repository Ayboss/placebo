const express = require("express");
const authcontroller = require("../controllers/authcontroller");
const router = express.Router();

router.post("/signup", authcontroller.signup);
router.post("/login", authcontroller.login);
router.post("/forgetpassword", authcontroller.forgetpassword)

router.use(authcontroller.protect)
router.post("/verifyotp", authcontroller.verifyOtp);
router.get("/resendotp", authcontroller.resendOTP);
module.exports = router;
