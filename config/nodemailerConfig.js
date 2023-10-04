require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_MAILER,
    pass: process.env.TOKEN_MAILER,
  },
});

module.exports = transporter;
