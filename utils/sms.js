const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceid = process.env.TWILLO_SERVICE_ID;

const client = require("twilio")(accountSid, authToken);

exports.sendTwilloSMSOTP = async (phonenumber) => {
  try {
    const verification = await client.verify.v2
      .services(serviceid)
      .verifications.create({ to: phonenumber, channel: "sms" });

    return verification;
  } catch (err) {
    throw err;
  }
};

exports.verifyTwilloSMSOTP = async (phonenumber, otp) => {
  try {
    const verificationcheck = client.verify.v2
      .services(serviceid)
      .verificationChecks.create({ to: phonenumber, code: otp });

    return verificationcheck;
  } catch (err) {
    throw err;
  }
};