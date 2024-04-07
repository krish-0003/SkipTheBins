// Author : Lokansh Gupta
const mongoose = require("mongoose");

var rewardPointsModel = require("../models/rewardPoints");
var voucherDetailsModel = require("../models/voucherDetails");
var voucherPurchasedModel = require("../models/voucherPurchased");
const User = require("../models/userModel.js");
var queryModel = require("../models/contactUsQuery");

//function to fetch all voucher details in GET call
const getVoucherDetails = (req, res) => {
  voucherDetailsModel
    .find()
    .then((result) => {
      if (voucherDetailsModel || voucherDetailsModel.length) {
        return res.status(200).json({
          success: true,
          message: "Voucher details retreived",
          voucherData: result,
        });
      }
    })
    .catch((error) => {
      console.log("Error-" + error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    });
};

//function to fetch reward points for specific customer in GET call
const getRewardPoints = (req, res) => {
  rewardPointsModel
    .find(req.query)
    .then((result) => {
      if (result && result.length > 0) {
        return res.status(200).json({
          success: true,
          message: "Reward points retreived",
          rewardData: result,
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "No Reward points found",
        });
      }
    })
    .catch((error) => {
      console.log("Error-" + error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    });
};

//function to update reward points
const updateRewardPoints = (req, res) => {
  rewardPointsModel
    .findOneAndUpdate(
      { customerId: req.body.customerId },
      { points: req.body.points }
    )
    .then((result) => {
      return res.status(201).json({
        success: true,
        message: "Reward points updated",
      });
    })
    .catch((error) => {
      console.log("Error-" + error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    });
};

//To purchase new voucher
const purchaseVoucher = (req, res) => {
  var companyName = req.body.companyName;
  var value = req.body.value;
  var points = req.body.points;
  var customerId = req.body.customerId;
  var email = req.body.email;
  var datePurchased = req.body.datePurchased;
  var refNumber = req.body.refNumber;

  const newVoucher = new voucherPurchasedModel({
    _id: new mongoose.Types.ObjectId(),
    companyName,
    value,
    points,
    customerId,
    email,
    datePurchased,
    refNumber,
  });

  newVoucher
    .save()
    .then((result) => {
      return res.status(201).json({
        success: true,
        message: "Voucher Purchased",
      });
    })
    .catch((error) => {
      console.log("Error-" + error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    });
};

//function to fetch all purchased vouchers in GET call
const getPurchasedVouchers = (req, res) => {
  voucherPurchasedModel
    .find()
    .then((result) => {
      if (voucherPurchasedModel || voucherPurchasedModel.length) {
        return res.status(200).json({
          success: true,
          message: "Purchased vouchers retreived",
          voucherData: result,
        });
      }
    })
    .catch((error) => {
      console.log("Error-" + error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    });
};

//function to fetch all vendors in GET call
const getVouchers = (req, res) => {
  voucherDetailsModel
    .find()
    .then((result) => {
      if (voucherDetailsModel || voucherDetailsModel.length) {
        return res.status(200).json({
          success: true,
          message: "Vouchers retreived",
          voucherData: result,
        });
      }
    })
    .catch((error) => {
      console.log("Error-" + error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    });
};

//function to submit a voucher in POST call
const addVoucher = (req, res) => {
  var companyName = req.body.companyName;
  var value = req.body.value;
  var points = req.body.points;

  const newVoucher = new voucherDetailsModel({
    _id: new mongoose.Types.ObjectId(),
    companyName,
    value,
    points,
  });

  newVoucher
    .save()
    .then((result) => {
      return res.status(201).json({
        success: true,
        message: "Voucher added",
      });
    })
    .catch((error) => {
      console.log("Error-" + error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    });
};

//function to update voucher details
const updateVoucher = (req, res) => {
  const updateVoucher = new voucherDetailsModel({
    companyName: req.body.companyName,
    value: req.body.value,
    points: req.body.points,
  });

  voucherDetailsModel
    .findByIdAndUpdate(req.body._id, updateVoucher)
    .then((result) => {
      return res.status(201).json({
        success: true,
        message: "Voucher updated",
      });
    })
    .catch((error) => {
      console.log("Error-" + error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    });
};

//function to delete voucher details
const deleteVoucher = (req, res) => {
  voucherDetailsModel
    .findByIdAndDelete(req.body._id)
    .then((result) => {
      return res.status(201).json({
        success: true,
        message: "Voucher deleted",
      });
    })
    .catch((error) => {
      console.log("Error-" + error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    });
};

//function to update reward points for complaints
const updateComplaintRewardPoints = async (req, res) => {
  const email = req.body.email;
  const userExists = await User.findOne({ email });

  if (userExists) {
    const updatedContactUs = await queryModel.findOneAndUpdate(
      { email: req.body.email },
      { points: req.body.points }
    );

    const existingPoints = await rewardPointsModel
      .findOne({ customerId: userExists._id.toString() })
      .exec();
    if (existingPoints) {
      rewardPointsModel
        .findOneAndUpdate(
          { customerId: userExists._id.toString() },
          { points: existingPoints.points + req.body.points }
        )
        .then((result) => {
          return res.status(200).json({
            success: true,
            message: "Reward points updated",
          });
        })
        .catch((error) => {
          console.log("Error-" + error);
          return res.status(500).json({
            success: false,
            message: "Internal Server Error",
          });
        });
    } else {
      const newRewardPoints = new rewardPointsModel({
        _id: mongoose.Types.ObjectId(),
        customerId: userExists._id.toString(),
        points: req.body.points,
      });

      newRewardPoints
        .save()
        .then((result) => {
          return res.status(200).json({
            success: true,
            message: "Reward points updated",
          });
        })
        .catch((err) => {
          console.log("Error-" + err);
          return res.status(500).json({
            success: false,
            message: "Internal Server Error",
          });
        });
    }
  } else {
    return res.status(200).json({
      success: true,
      message: "User does not exist",
    });
  }
};

module.exports = {
  getVoucherDetails,
  getRewardPoints,
  updateRewardPoints,
  purchaseVoucher,
  getPurchasedVouchers,
  getVouchers,
  addVoucher,
  updateVoucher,
  deleteVoucher,
  updateComplaintRewardPoints,
};
