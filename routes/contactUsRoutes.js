// Author : Lokansh Gupta
const express = require("express");
const controller = require("../controllers/contactUs.controllers");
const auth = require("../middlewares/authMiddleware.js");

const router = express.Router();

//Queries API call requests
router.get("/queries", auth, controller.getQueries);
router.post("/query/add", controller.submitQuery);

//Vendors API call request
router.get("/vendor", controller.getVendors);
router.post("/vendor/add", auth, controller.addVendor);
router.post("/vendor/update", auth, controller.updateVendor);
router.post("/vendor/delete", auth, controller.deleteVendor);

module.exports = router;
