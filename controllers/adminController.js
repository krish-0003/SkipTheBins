/**
 *   @author : Vasu Gamdha (B00902737)
 */

const mongoose = require("mongoose");

const transporter = require("../mailer/transporter.js");

const User = require("../models/userModel.js");

/**
 * @description: Fetches the list of all the vendors who have requested for account creation.
 */
const getUnapprovedVendorList = async (req, res) => {
  try {
    const unapprovedVendorList = await User.find({
      role: "vendor",
      isApprovedByAdminIfVendorRole: false,
    });
    res.status(200).json(unapprovedVendorList);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

/**
 * @description: Approves vendor's account creation request.
 * Allows vendor to access their account.
 */
const approveVendorProfile = async (req, res) => {
  const { id: _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No user with that id");
    const updatedVendorProfile = await User.findByIdAndUpdate(
      _id,
      { isApprovedByAdminIfVendorRole: true, _id },
      { new: true }
    );
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: updatedVendorProfile.email,
      subject: "Vendor Account Creation",
      text: "Your request to create your vendor account has been sent accepted.",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.json({ result: updatedVendorProfile });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

/**
 * @description: Fetches the list of all the vendors who have requested for account deletion.
 */
const getVendorDeletionRequestList = async (req, res) => {
  try {
    const deletionRequestList = await User.find({
      role: "vendor",
      isProfileDeletionRequested: true,
    });
    res.status(200).json(deletionRequestList);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

/**
 * @description: Creates a request to delete account of a vendor
 * Admin;s approval is required to delete the account.
 */
const requestVendorDeletion = async (req, res) => {
  const { id: _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No user with that id");
    const updatedVendorProfile = await User.findByIdAndUpdate(
      _id,
      { isProfileDeletionRequested: true, _id },
      { new: true }
    );

    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: updatedVendorProfile.email,
      subject: "Vendor Account Deletion",
      text: "Your request to delete your vendor account has been sent successfully.",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.json({ result: updatedVendorProfile });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

/**
 * @description: Declines vendor's account deletion request.
 * Vendor cannot delete their account without admin's permission.
 */
const declineVendorDeletion = async (req, res) => {
  const { id: _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No user with that id");
    const updatedVendorProfile = await User.findByIdAndUpdate(
      _id,
      { isProfileDeletionRequested: false, _id },
      { new: true }
    );

    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: updatedVendorProfile.email,
      subject: "Declined Vendor Account Deletion",
      text: "Your request to delete your vendor account has been declined.",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.json({ result: updatedVendorProfile });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

/**
 * @description: Declines vendor's account creation request.
 * Vendor account will not be created.
 */
const declineVendorCreation = async (req, res) => {
  const { id: _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No user with that id");

    const vendorDetails = await User.findById(_id);
    await User.findByIdAndDelete(_id);

    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: vendorDetails.email,
      subject: "Declined Vendor Account Creation",
      text: "Your request to create your vendor account has been declined.",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          message: "Vendor profile creation request declined successfully.",
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = {
  getUnapprovedVendorList,
  getVendorDeletionRequestList,
  approveVendorProfile,
  declineVendorCreation,
  declineVendorDeletion,
  requestVendorDeletion,
};
