// Author : Lokansh Gupta, Prashit Patel
const express = require("express");
const controller = require("../controllers/rewardStore.controllers");
const auth = require("../middlewares/authMiddleware.js");

const router = express.Router();

//Queries API call requests
router.get("/voucher/allDetails", auth, controller.getVoucherDetails);

//route to get user points
router.get("/reward/getPoints", auth, controller.getRewardPoints);

//route to update user points
router.post("/reward/updatePoints", auth, controller.updateRewardPoints);

router.post("/voucher/purchase", auth, controller.purchaseVoucher);

router.get(
  "/voucher/getPurchaseVouchers",
  auth,
  controller.getPurchasedVouchers
);
router.get("/voucher", auth, controller.getVouchers);
router.post("/voucher/add", auth, controller.addVoucher);
router.post("/voucher/update", auth, controller.updateVoucher);
router.post("/voucher/delete", auth, controller.deleteVoucher);

//route to update reward points
router.put(
  "/reward/updateComplaintPoints",
  auth,
  controller.updateComplaintRewardPoints
);

module.exports = router;
