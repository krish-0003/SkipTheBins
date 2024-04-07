// Author : Lokansh Gupta
const mongoose = require("mongoose");

var queryModel = require("../models/contactUsQuery");
var vendorModel = require("../models/contactUsVendor");

//function to fetch all queries in GET call
const getQueries = (req, res) => {
  queryModel
    .find()
    .then((result) => {
      if (queryModel || queryModel.length) {
        return res.status(200).json({
          success: true,
          message: "Queries retreived",
          queryData: result,
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

//function to submit a query in POST call
const submitQuery = (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var mobile = req.body.mobile;
  var querySubject = req.body.querySubject;
  var query = req.body.query;
  var refNumber = req.body.refNumber;

  const newQuery = new queryModel({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    mobile,
    querySubject,
    query,
    points: 0,
    refNumber,
  });

  newQuery
    .save()
    .then((result) => {
      return res.status(201).json({
        success: true,
        message: "Query Submitted",
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

//function to fetch all queries in GET call
const getVendors = (req, res) => {
  vendorModel
    .find()
    .then((result) => {
      if (vendorModel || vendorModel.length) {
        return res.status(200).json({
          success: true,
          message: "Vendors retreived",
          vendorData: result,
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

//function to submit a query in POST call
const addVendor = (req, res) => {
  var name = req.body.name;
  var address = req.body.address;
  var phoneNumber = req.body.phoneNumber;
  var email = req.body.email;

  const newVendor = new vendorModel({
    _id: new mongoose.Types.ObjectId(),
    name,
    address,
    phoneNumber,
    email,
  });

  newVendor
    .save()
    .then((result) => {
      return res.status(201).json({
        success: true,
        message: "Vendor added",
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

//function to update vendor details
const updateVendor = (req, res) => {
  const updateVendor = new vendorModel({
    name: req.body.name,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
  });

  vendorModel
    .findByIdAndUpdate(req.body._id, updateVendor)
    .then((result) => {
      return res.status(201).json({
        success: true,
        message: "Vendor updated",
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

//function to delete vendor details
const deleteVendor = (req, res) => {
  vendorModel
    .findByIdAndDelete(req.body._id)
    .then((result) => {
      return res.status(201).json({
        success: true,
        message: "Vendor deleted",
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

module.exports = {
  getQueries,
  submitQuery,
  getVendors,
  addVendor,
  updateVendor,
  deleteVendor,
};
