// Authors: Prashit Patel (B00896717), Vivekkumar Patel (B00896765)

const express = require("express");
const router = express.Router();
const vendorScheduleController = require("../controllers/vendorScheduleController");
const auth = require("../middlewares/authMiddleware.js");

//route to get schedules
router.get("/schedules", auth, vendorScheduleController.getSchedule);

//route to create schedules
router.post("/create", auth, vendorScheduleController.createSchedule);

//route to update schedule
router.put("/update/:id", auth, vendorScheduleController.updateSchedule);

//route to delete schedule
router.delete("/delete/:id", auth, vendorScheduleController.deleteSchedule);

//route to update status of individual schedule
router.put("/schedules/update", auth, vendorScheduleController.updateStatus);

//route ro add new individual schedule
router.post("/schedules/add", auth, vendorScheduleController.addSchedule);

module.exports = router;
