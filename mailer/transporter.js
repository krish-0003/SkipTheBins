/**
 *   @author : Vasu Gamdha (B00902737)
 */

const nodemailer = require("nodemailer");

/**
 * @description: A trasporter object to send the emails using nodemailer service.
 */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "skipthebins@gmail.com",
    pass: "skipthebins@123",
  },
});

module.exports = transporter;
