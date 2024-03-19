const Pharm = require("./../model/PharmModel");

exports.getAllpharmacy = async (req, res, next) => {
  try {
  } catch (err) {}
};

exports.getonepharmacy = async (req, res, next) => {
  try {
  } catch (err) {}
};

exports.createonepharmacy = async (req, res, next) => {
  try {
    const pharm = await Pharm.create(req.body);

    return res.status(200).json({
      data: pharm,
    });
  } catch (err) {
    return res.status(400).json({
      err: err,
      message: "unable to create ",
    });
  }
};

exports.updateonepharmacy = async (req, res, next) => {
  try {
  } catch (err) {}
};

exports.deleteonepharmacy = async (req, res, next) => {
  try {
  } catch (err) {}
};
