const Validator = require('validator');

// isEmpty
const isEmpty = require('../isEmpty');

module.exports = function(data) {
  const errors = {};

  // Check for undefined
  data.text = isEmpty(data.text) ? '' : data.text;

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Comment field is required';
  }

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Comment must be between 10-300 characters';
  }

  return {
    isValid: isEmpty(errors),
    errors
  };
};
