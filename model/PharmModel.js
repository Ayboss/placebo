const mongoose = require("mongoose");

const pharmschema = new mongoose.Schema({
  premisesName: {
    type: String,
    required: true,
  },
  superintendent: {
    type: String,
    required: true,
  },
  certificateNumber: {
    type: String,
    required: true,
  },
  premisesAddress: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Pharm", pharmschema);
