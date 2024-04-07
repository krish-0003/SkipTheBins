// Author : Aabhaas Jain
const express = require("express");
const router = express.Router();
const faqController = require("../controllers/faqController");
const faqRequestController = require("../controllers/faqRequestController");
const auth = require("../middlewares/authMiddleware.js");
// routes for faqs
router.get("/", faqController.getFaq);

router.post("/", auth, faqController.createFaq);

router.put("/:id", auth, faqController.updateFaq);

router.delete("/:id", auth, faqController.deleteFaq);

router.get("/requests", auth, faqRequestController.getRequests);

router.post("/create-request", auth, faqRequestController.createRequest);

router.delete("/deny-request/:id", auth, faqRequestController.deleteRequest);

router.post("/approve-request", auth, faqRequestController.approveRequest);

module.exports = router;
