// Author : Aabhaas Jain
const notification = require("../models/notiificationModel");

const addNotification = (req, res) => {
  // adding notification/annoncements
  let date = new Date();
  notification
    .create({ ...req.body, timeStamp: date })
    .then((_) => {
      res.status(200).send("Insertion successful");
    })
    .catch((err) => {
      console.log(err);
      res.statusCode = 500;
      res.send({ message: "Internal Server Error!" });
    });
};

const getAllAnnouncements = (req, res) => {
  // fetching all announcements
  notification
    .find({ type: "announcement" })
    .then((_) => {
      res.status(200).json({ data: _ });
    })
    .catch((err) => {
      console.log(err);
      res.statusCode = 500;
      res.send({ message: "Internal Server Error!" });
    });
};

const getNotificationsById = (req, res) => {
  //fetch notifications/announcements by user id
  notification
    .find()
    .or([{ user: req.params.id }, { user: "all" }])
    .then((_) => {
      res.status(200).json({ data: _ });
    })
    .catch((err) => {
      console.log(err);
      res.statusCode = 500;
      res.send({ message: "Internal Server Error!" });
    });
};

const deleteNotification = (req, res) => {
  // delete notification/announcements
  let id = req.params.id;
  notification
    .findByIdAndDelete(id)
    .then((_) => {
      res.status(200).send("Deletion successful");
    })
    .catch((err) => {
      console.log(err);
      res.statusCode = 500;
      res.send({ message: "Internal Server Error!" });
    });
};

module.exports = {
  addNotification,
  getAllAnnouncements,
  getNotificationsById,
  deleteNotification,
};
