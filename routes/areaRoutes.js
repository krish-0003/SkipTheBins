// Authors: Prashit Patel (B00896717), Vivekkumar Patel (B00896765)

const express = require("express");
const router = express.Router();
const areaController = require("../controllers/areaController");

router.get("/area", areaController.getArea);

router.post("/area", areaController.createArea);

module.exports = router;
