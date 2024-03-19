const mongoose = require("mongoose");

const pharmschema = new mongoose.Schema({});

module.exports = mongoose.model("Pharm", pharmschema);
