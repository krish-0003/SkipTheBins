// Authors: Prashit Patel (B00896717), Vivekkumar Patel (B00896765)

const mongoose = require("mongoose");

//User Pickup Schema
const userPickupSchema = {
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: String },
  pickupId: { type: Number },
  date: { type: String },
  area: { type: String },
  slot: { type: String },
  vendor: { type: String },
  batchNo: { type: String },
  wasteType: [String],
  wasteQty: { type: Number },
  boxQty: { type: Number },
  address: { type: String },
  points: { type: Number },
};
module.exports = mongoose.model("UserPickups", userPickupSchema);
