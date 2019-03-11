const Validator = require('validator');

// isEmpty
const isEmpty = require('../isEmpty');

module.exports = function(data) {
  const errors = {};

  // Check for undefined
  data.title = isEmpty(data.title) ? '' : data.title;
  data.text = isEmpty(data.text) ? '' : data.text;

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Text must be between 10-300 characters';
  }

  return {
    isValid: isEmpty(errors),
    errors
  };
};
