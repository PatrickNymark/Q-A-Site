const Validator = require('validator');

// isEmpty
const isEmpty = require('../isEmpty');

module.exports = function(data) {
  const errors = {};

  // Check for undefined
  data.resetTokenExperation = isEmpty(data.resetTokenExperation)
    ? ''
    : data.resetTokenExperation;

  if (Validator.isBefore(Date.now(), data.resetTokenExperation)) {
    errors.resetTokenExperation = 'Reset token has experied';
  }

  return {
    isValid: isEmpty(errors),
    errors
  };
};
