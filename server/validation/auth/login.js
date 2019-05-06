const Validator = require('validator');

// isEmpty
const isEmpty = require('../isEmpty');

module.exports = function (data) {
  const errors = {};

  // Check for undefined
  data.email = isEmpty(data.email) ? '' : data.email;
  data.password = isEmpty(data.password) ? '' : data.password;

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is not valid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    isValid: isEmpty(errors),
    errors
  };
};
