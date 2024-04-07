// Authors: Prashit Patel (B00896717), Vivekkumar Patel (B00896765)

const mongoose = require("mongoose");

//Vendor Schedule Schema
const vendorSchedulesSchema = {
  _id: mongoose.Schema.Types.ObjectId,
  scheduleId: { type: Number },
  vendorId: { type: String },
  vendor: { type: String },
  batchNo: { type: String },
  status: { type: String },
  date: { type: String },
  area: { type: String },
  slot: { type: String },
};

module.exports = mongoose.model("vendorSchedules", vendorSchedulesSchema);
