// Author : Lokansh Gupta
const mongoose = require("mongoose");

const querySchema = {
  _id: mongoose.Schema.Types.ObjectId,
  companyName: { type: String },
  value: { type: Number },
  points: { type: Number },
  customerId: { type: String },
  datePurchased: { type: String },
  refNumber: { type: String },
  email: { type: String },
};

module.exports = mongoose.model("VouchersPurchased", querySchema);
