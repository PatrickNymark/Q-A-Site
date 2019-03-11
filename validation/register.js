const Validator = require('validator');

// isEmpty
const isEmpty = require('./isEmpty');

module.exports = function(data) {
  const errors = {};

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'First name field is required';
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last name field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is not valid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = 'Password should be between 6-20 characters';
  }

  return {
    isValid: isEmpty(errors),
    errors
  };
};
