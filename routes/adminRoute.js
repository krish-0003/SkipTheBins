/**
 *   @author : Vasu Gamdha (B00902737)
 */

const express = require("express");
const { getUnapprovedVendorList, approveVendorProfile, getVendorDeletionRequestList, requestVendorDeletion, declineVendorDeletion, declineVendorCreation } = require("../controllers/adminController.js");
const auth = require("../middlewares/authMiddleware.js");

const router = express.Router();

// @route   GET /api/adminActions/unapprovedList
router.get('/unapprovedList', auth, getUnapprovedVendorList);

// @route   PATCH /api/adminActions/:id/approveVendorProfile
router.patch('/:id/approveVendorProfile', auth, approveVendorProfile);

// @route   GET /api/adminActions/deletionList
router.get('/deletionList', auth, getVendorDeletionRequestList);

// @route DELETE /api/adminActions/:id/requestDeletion
router.delete('/:id/requestDeletion', auth, requestVendorDeletion);

// @route DELETE /api/adminActions/:id/declineVendorCreation
router.delete('/:id/declineVendorCreation', auth, declineVendorCreation);

// @route PATCH /api/adminActions/:id/declineVendorDeletion
router.patch('/:id/declineVendorDeletion', auth, declineVendorDeletion);

module.exports = router;