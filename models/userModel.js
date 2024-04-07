/**
 *   @author : Vasu Gamdha (B00902737)
 */

const mongoose = require("mongoose");

/**
 * @description: A user schema to define the structure of the user details.
 */
const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  mobileNumber: { type: Number, required: true },
  address: { type: String, required: true },
  imageBase64: { type: String },
  role: { type: String, required: true },
  gender: { type: String, required: true },
  organizationName: { type: String },
  reason: { type: String },
  isApprovedByAdminIfVendorRole: { type: Boolean },
  isProfileDeletionRequested: { type: Boolean },
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String, required: true },
  points: { type: Number, required: false },
});

const User = mongoose.model("group14User", userSchema);

module.exports = User;
