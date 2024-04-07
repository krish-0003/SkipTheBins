// Author: Prashit Patel (B00896717)

const mongoose = require("mongoose");

const areaSchema = {
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String }
};

module.exports = mongoose.model("Areas", areaSchema);
