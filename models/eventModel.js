/*Author: Jaimi Maheshbhai Sheta (B00886563)*/

const mongoose = require("mongoose");

const eventSchema = {
  eventName: { type: String },
  eventLocation: { type: String },
  eventDate: { type: String },
};

const event = mongoose.model("Events", eventSchema);

module.exports = event;
