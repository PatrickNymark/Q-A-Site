const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// Load Model
const User = require('../../models/User');

// Validator
const registerValidator = require('../../validation/auth/register');
const loginValidator = require('../../validation/auth/login');

/*

  __REGISTER USER

*/
exports.registerUser = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const { isValid, errors } = registerValidator(req.body);

  // Validate input
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email })
    .then(user => {
      // Check if user exists
      if (user) {
        errors.email = 'User already exists';
        return res.status(400).json(errors);
      }

      // Generate salt
      bcrypt.genSalt(10, (err, salt) => {
        // Hash password
        bcrypt.hash(password, salt).then(hashedPassword => {
          // Create new user
          const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
          });

          // Save new user to database
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => res.status(500).json(err.message));
        });
      });
    })
    .catch(err => res.status(500).json(err.message));
};

/*

  __LOGIN USER

*/
exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  const { isValid, errors } = loginValidator(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email })
    .then(user => {
      // User not found
      if (!user) {
        errors.email = 'Email does not exist';
        return res.status(400).json(errors);
      }

      // Compare password with crypted
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          // Passwords dont match
          if (!isMatch) {
            errors.password = 'Password incorrect';
            return res.status(400).json(errors);
          }

          // Create jwt payload
          const payload = {
            id: user._id,
            name: user.firstName + ' ' + user.lastName
          };

          // Sign jwt token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 36000 },
            (err, token) => {
              res.json({ success: true, token: 'bearer ' + token });
            }
          );
        })
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
};
