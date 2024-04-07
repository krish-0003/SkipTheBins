// Authors: Prashit Patel (B00896717), Vivekkumar Patel (B00896765)

const express = require("express");
const router = express.Router();
const userPickupController = require("../controllers/userPickupController");
const auth = require("../middlewares/authMiddleware.js");

//route to get user pickups
router.get("/pickups", auth, userPickupController.getPickups);

//route to create user pickup
router.post("/schedule", auth, userPickupController.schedulePickups);

//route to delete user pickup
router.delete("/cancel/:id", auth, userPickupController.cancelPickup);

//route to get status of user pickups
router.get("/pickups/status", auth, userPickupController.trackStatus);

//route to update user pickup
router.put("/update/:id", auth, userPickupController.updatePickup);

module.exports = router;
