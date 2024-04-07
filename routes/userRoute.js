/**
 *   @author : Vasu Gamdha (B00902737)
 */

const express = require("express");

const { signup, login, editProfile, changePassword, deleteProfile, verifyAccount } = require("../controllers/userController.js");
const auth = require("../middlewares/authMiddleware.js");

const router = express.Router();

// @route   POST /api/profile/verify/:verificationCode
router.get('/verify/:verificationCode', verifyAccount)

// @route   POST /api/profile/signup
router.post('/signup', signup);

// @route   POST /api/profile/login
router.post('/login', login);

// @route   PATCH /api/profile/editProfile
router.patch('/:id/editProfile',auth, editProfile)

// @route   PATCH /api/profile/:id/changePassword
router.patch('/:id/changePassword',auth, changePassword)

// @route   DELETE /api/profile/:id/deleteProfile
router.delete('/:id/deleteProfile',auth , deleteProfile)

module.exports = router;