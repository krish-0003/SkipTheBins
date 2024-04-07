/*Author: Jaimi Maheshbhai Sheta (B00886563)*/

const express = require("express");
const controller = require("../controllers/analytics.controllers");
const router = express.Router();
const auth = require("../middlewares/authMiddleware.js");

router.get("/get-all-rewards", auth,  controller.getAllRewardsAdmin);
router.get("/get-all-users", auth, controller.getAllUsersAdmin);
router.get("/get-all-events", auth, controller.getAllEventsAdmin);
router.post("/add-event", auth, controller.addEvent);
router.delete("/delete-event/:id", auth, controller.deleteEvent);

module.exports = router;