// Authors: Prashit Patel (B00896717), Vivekkumar Patel (B00896765)

const vendorSchedules = require("../models/vendorSchedules");
const moment = require("moment");
const mongoose = require("mongoose");
const userPickups = require("../models/userPickups");
const User = require("../models/userModel.js");
const rewardPointsModel = require("../models/rewardPoints");

//controller to get vendor schedules
const getSchedule = async (req, res) => {
  vendorSchedules
    .find(req.query)
    .exec()
    .then((result) => {
      try {
        if (!result || result.length === 0) {
          res.statusCode = 200;
          res.send({ message: "Schedules not found!" });
        } else {
          res.statusCode = 200;
          res.send({
            message: "Schedules retrieved",
            success: true,
            schedules: result,
          });
        }
      } catch (err) {
        res.statusCode = 500;
        res.send({ message: "Schedules retrieval failed!" });
      }
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send({ message: "Something went wrong!" });
    });
};

//controller to create vendor schedule
const createSchedule = async (req, res) => {
  try {
    let successCount = 0;
    let errorCount = 0;
    const slots = req.body.slots;

    let fromDate = req.body.fromDate;
    let toDate = moment(req.body.toDate, ["LL"]).add(1, "day").format("LL");

    while (fromDate !== toDate) {
      for (var i = 0; i < slots.length; i++) {
        const lastSchedule = await vendorSchedules
          .findOne()
          .sort({ field: "asc", _id: -1 })
          .limit(1);
        const scheduleCount = lastSchedule ? lastSchedule.scheduleId + 1 : 1;

        const schedule = new vendorSchedules({
          _id: mongoose.Types.ObjectId(),
          scheduleId: scheduleCount,
          vendorId: req.body.vendorId,
          vendor: req.body.vendor,
          batchNo: `BATCH${scheduleCount}`,
          status: "Waste Pick-up Scheduled",
          date: fromDate,
          area: slots[i].area,
          slot: slots[i].time[0] + " - " + slots[i].time[1],
        });

        await schedule
          .save()
          .then((result) => {
            successCount++;
          })
          .catch((err) => {
            console.log(err);
            errorCount++;
          });
      }
      fromDate = moment(fromDate, ["LL"]).add(1, "day").format("LL");
    }

    res.statusCode = 200;
    res.send({
      message: `${successCount} schedules successfully created.`,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.send({ message: "Something went wrong!" });
  }
};

//controller to edit vendor schedule
const updateSchedule = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedSchedule = {
      area: req.body.area,
      slot: req.body.slot[0] + " - " + req.body.slot[1],
    };

    vendorSchedules.findOneAndUpdate(
      { scheduleId: id },
      updatedSchedule,
      (err, schedule) => {
        if (err) {
          res.statusCode = 500;
          res.send({ message: "Schedule update failed!" });
        } else {
          res.statusCode = 200;
          res.send({
            message: "Schedule updated",
            success: true,
            schedule: schedule,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.send({ message: "Something went wrong!" });
  }
};

//controller to delete vendor schedule
const deleteSchedule = async (req, res) => {
  try {
    const id = req.params.id;
    vendorSchedules.findOneAndDelete({ scheduleId: id }, (err, pickup) => {
      if (err) {
        res.statusCode = 500;
        res.send({ message: "Schedule deletion failed!" });
      } else {
        res.statusCode = 200;
        res.send({ message: "Schedule deleted successfully", success: true });
      }
    });
  } catch (err) {
    res.statusCode = 500;
    res.send({ message: "Something went wrong!" });
  }
};

//Update pickup status
const updateStatus = async (req, res) => {
  try {
    const _id = req.body._id;
    const status = req.body.status;
    const batchNo = req.body.batchNo;
    const data = {
      status,
    };

    if (status === "Waste Recycled") {
      const admin = await User.findOne({ role: "admin" });
      const points = admin?.points;

      userPickups.find({ batchNo: batchNo }, (err, pickups) => {
        if (err) {
          console.log(err);
        } else {
          //foreach pickup - update
          for (var i = 0; i < pickups.length; i++) {
            
            userPickups.findOneAndUpdate(
              { pickupId: pickups[i].pickupId },
              { points: pickups[i].wasteQty * points },
              (err, pickup) => {
                if (err) {
                  console.log(error);
                }
              }
            );
            const currentPickup = pickups[i];
            rewardPointsModel
              .find({ customerId: pickups[i].userId })
              .exec()
              .then((existingPoints) => {
                if (existingPoints.length > 0) {
                  console.log(existingPoints[0]._id.toString())
                  rewardPointsModel.findByIdAndUpdate(
                    existingPoints[0]._id.toString(),
                    { points: (existingPoints[0].points + (currentPickup.wasteQty * points)) }
                    ).then((res) => {
                    console.log(res);
                  }).catch((err) => {
                    console.log(err);
                  });
                } else {
                  console.log("new")
                  const newRewardPoints = new rewardPointsModel({
                    _id: mongoose.Types.ObjectId(),
                    customerId: currentPickup.userId,
                    points: currentPickup.wasteQty * points,
                  });

                  newRewardPoints.save();
                }
              });
          }
        }
      });
    }

    vendorSchedules.findByIdAndUpdate(_id, data, (err, schedule) => {
      if (err) {
        res.statusCode = 500;
        res.send({ message: "Status update failed!" });
      } else {
        res.statusCode = 200;
        res.send({ message: "Status updated", success: true });
      }
    });
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.send({ message: "Something went wrong!" });
  }
};

//controller to add individual vendor schedule
const addSchedule = async (req, res) => {
  try {
    const lastSchedule = await vendorSchedules
      .findOne()
      .sort({ field: "asc", _id: -1 })
      .limit(1);
    const scheduleCount = lastSchedule ? lastSchedule.scheduleId + 1 : 1;

    const schedule = new vendorSchedules({
      _id: mongoose.Types.ObjectId(),
      scheduleId: scheduleCount,
      vendorId: req.body.vendorId,
      vendor: req.body.vendor,
      batchNo: `BATCH${scheduleCount}`,
      status: "Waste Pick-up Scheduled",
      date: req.body.date,
      area: req.body.area,
      slot: req.body.slot[0] + " - " + req.body.slot[1],
    });

    await schedule
      .save()
      .then((result) => {
        res.send({
          message: `Schedules added successfully`,
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        res.send({
          message: `Schedules addition failed`,
        });
      });
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.send({ message: "Something went wrong!" });
  }
};

module.exports = {
  getSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  updateStatus,
  addSchedule,
};
