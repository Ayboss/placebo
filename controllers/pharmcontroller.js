const Pharm = require("./../model/PharmModel");

exports.getAllpharmacy = async (req, res, next) => {
  try {
    const pharmacies = await Pharm.find();
    return res.status(200).json({
      data: pharmacies,
    });
  } catch (err) {
    return res.status(400).json({
      err: err,
      message: "unable to find ",
    });
  }
};

exports.getonepharmacy = async (req, res, next) => {
  try {
    const pharmacies = await Pharm.findById(req.params.id);
    if (!pharmacies) {
      return res.status(400).json({
        message: "no pharmacies found",
      });
    }
    return res.status(200).json({
      data: pharmacies,
    });
  } catch (err) {
    return res.status(400).json({
      err: err,
      message: "unable to find ",
    });
  }
};

exports.createonepharmacy = async (req, res, next) => {
  try {
    const pharmacies = await Pharm.create(req.body);
    return res.status(200).json({
      data: pharmacies,
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
    const pharmacies = await Pharm.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({
      data: pharmacies,
    });
  } catch (err) {
    return res.status(400).json({
      err: err,
      message: "unable to update pharmacy ",
    });
  }
};

exports.deleteonepharmacy = async (req, res, next) => {
  try {
    await Pharm.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "pharmacies has been deleted",
    });
  } catch (err) {
    return res.status(400).json({
      err: err,
      message: "unable to delete pharmacy ",
    });
  }
};
