const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const keys = require('../config/keys');

exports.transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: keys.sendGrid
    }
  })
);
