const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const keys = require('../config/keys');

module.exports = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: keys.sendGrid
    }
  })
);
