const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const app = express();
const databaseConnection = require("./middlewares/databaseConnection");
app.use(express.json());
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const analyticsRoutes = require("./routes/analyticsRoutes");
const faqRoutes = require("./routes/faqRoutes");
const userPickupRoutes = require("./routes/userPickupRoutes");
const vendorScheduleRoutes = require("./routes/vendorScheduleRoutes");
const areaRoutes = require("./routes/areaRoutes");
const contactUsRoutes = require("./routes/contactUsRoutes");
const rewardStoreRoutes = require("./routes/rewardStoreRoutes");
const userRoutes = require("./routes/userRoute.js");
const vendorRoutes = require("./routes/adminRoute.js");
const eventRoutes = require("./routes/eventsRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

databaseConnection();

const rootRoute = "/api/";
app.use(rootRoute + "faq", faqRoutes);
app.use(rootRoute + "notification", notificationRoutes);

//user pickup routes
app.use(rootRoute + "user", userPickupRoutes);

//vendor schedule routes
app.use(rootRoute + "vendor", vendorScheduleRoutes);
app.use(rootRoute + "admin", analyticsRoutes);
app.use(rootRoute, areaRoutes);
app.use(rootRoute, contactUsRoutes);
app.use(rootRoute, rewardStoreRoutes);
app.use(rootRoute + "event", eventRoutes);
app.use(rootRoute + "adminActions", vendorRoutes);
app.use(rootRoute + "profile", userRoutes);
app.use("/", (req, res) => {
  res.send("Welcome to Skip the Bins!!");
});

module.exports = app;
