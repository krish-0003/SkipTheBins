/**
 *   @author : Vasu Gamdha (B00902737)
 */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const transporter = require("../mailer/transporter.js");

const User = require("../models/userModel.js");

/**
 * @description: This function is used to verify the user's email address.
 */
const verifyAccount = async (req, res) => {
  const { verificationCode } = req.params;
  try {
    const userExists = await User.findOne({ verificationCode });
    if (!userExists)
      return res.status(404).send({ message: "User doesn't exist." });
    userExists.isVerified = true;
    await userExists.save();
    htmlContent = `<html><head><meta http-equiv='Refresh' content="0; url='https://skipthebins.herokuapp.com/login'" /><link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossorigin="anonymous"
  />
    </head><body><div className="border d-flex align-items-center justify-content-center"><h1>Account Verified!</h1> <h5>If not redirected, <Button href='https://skipthebins.herokuapp.com/login'>Click here to Login</Button></h5></div></body></html>`;
    res.status(200).send(htmlContent);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

/**
 * @description: This function is used to get the user's profile details and creates a token for the user logged in.
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (!userExists)
      return res
        .status(404)
        .json({
          message: "This email address is not linked with any account!",
        });

    if (
      userExists.role === "vendor" &&
      !userExists.isApprovedByAdminIfVendorRole
    )
      return res
        .status(401)
        .json({ message: "Please, wait for admin to approve your account." });

    if (!userExists.isVerified)
      return res.status(400).json({ message: "Please, verify your account!" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExists.password
    );

    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ message: "Either email or password is incorrect." });

    const token = jwt.sign(
      { email: userExists.email, id: userExists._id },
      "Group14",
      { expiresIn: "24h" }
    );

    res.status(200).json({ result: userExists, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

/**
 * @description: This function is used to create a user profile (normal user and vendor account).
 * It also sends an email to the user to verify the account.
 */
const signup = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    confirmPassword,
    address,
    mobileNumber,
    imageBase64,
    gender,
    role,
    organizationName,
    reason,
  } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists)
      return res
        .status(400)
        .json({
          message:
            "This email address is already linked with an account! Try logging in!",
        });

    if (password !== confirmPassword)
      res.status(400).json({ message: "Passwords don't match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const isApprovedByAdminIfVendorRole = role === "vendor" ? false : true;
    const token = jwt.sign({ email }, "Group14");
    const result = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      address,
      mobileNumber,
      imageBase64,
      gender,
      role,
      isApprovedByAdminIfVendorRole,
      organizationName,
      reason,
      verificationCode: token,
    });

    const mailOptions = {
      from: "skipthebins@gmail.com",
      to: email,
      subject: "STB Account Verification",
      html: `<div>Your account has been registered with us. Please click on the below link to verify your email. <a href=https://skip-the-bins-backend.herokuapp.com/api/profile/verify/${token}> Click here to verify </a>
            <p>${
              role === "vendor"
                ? "Your vendor account creation request has also been sent successfully. Please wait for admin approval."
                : ""
            }<p></div>
                    `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.status(200).json({ message: "Account registered successfully" });
      }
    });

    res.status(200).json({ result: result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

/**
 * @description: This function is used to update the user's profile details.
 */
const editProfile = async (req, res) => {
  const { id: _id } = req.params;
  const newDetails = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("The user doesn't exist.");

    const updatedUserDetails = await User.findByIdAndUpdate(
      _id,
      { ...newDetails, _id },
      { new: true }
    );

    res.json({ result: updatedUserDetails });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

/**
 * @description: This function is used to modify user's password.
 */
const changePassword = async (req, res) => {
  const { id: _id } = req.params;
  const { email, currentPassword, newPassword } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (!userExists)
      return res.status(400).json({ message: "The user doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      userExists.password
    );

    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ message: "Your current password is incorrect." });

    const isNewSameAsCurrent = await bcrypt.compare(
      newPassword,
      userExists.password
    );

    if (isNewSameAsCurrent)
      return res
        .status(400)
        .json({
          message:
            "Please enter a new password different from your current password!",
        });

    const newHashedPassword = await bcrypt.hash(newPassword, 12);

    const updatedUserDetails = await User.findByIdAndUpdate(
      _id,
      { password: newHashedPassword, _id },
      { new: true }
    );

    res.json({ result: updatedUserDetails });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

/**\
 * @description: This function is used to delete the user's account permanently.
 * A normal user can delete their account anytime.
 * A vendor can only delete their account after admin approval.
 */
const deleteProfile = async (req, res) => {
  const { id: _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No user with that id");

    await User.findByIdAndDelete(_id);

    res.json({ message: "Profile deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = {
  signup,
  login,
  verifyAccount,
  changePassword,
  editProfile,
  deleteProfile,
};
