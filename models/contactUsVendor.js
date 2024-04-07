// Author : Lokansh Gupta
const mongoose = require("mongoose");

const vendorSchema = {
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  address: { type: String },
  phoneNumber: { type: String },
  email: { type: String },
};

module.exports = mongoose.model("ContactUsVendor", vendorSchema);
