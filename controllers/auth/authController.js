const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// Mail
const transporter = require('../../middleware/mailer');

// Load Model
const User = require('../../models/User');

// Validator
const registerValidator = require('../../validation/auth/register');
const loginValidator = require('../../validation/auth/login');

/*

  __VERIFY AND RESET PASSWORD CONTROLLERS

*/
exports.reset = require('./reset');
exports.verify = require('./verify');

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

      // Create user
      const newUser = new User({
        firstName,
        lastName,
        email,
        password
      });

      // Save new user
      newUser
        .save()
        .then(user => {
          const mailOptions = {
            to: user.email,
            from: 'quora-help@replica.com',
            subject: 'New Quora Replica Account',
            html: `
              <h4>Welcome, ${user.firstName}</h4>
               <p>Your account was succesfully created</p>
               <a href="http://localhost:3000/dashboard">Go to your profile</a>
            `
          };

          // Send welcome mail
          transporter.sendMail(mailOptions, err => {
            if (err) {
              return res.status(500).json({ msg: err.message });
            }

            res.json(user);
          });
        })
        .catch(err => res.status(500).json(err.message));
    })
    .catch(err => res.status(500).json(err.message));
};

/*

  __LOGIN USER

*/
exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  const { isValid, errors } = loginValidator(req.body);

  // Validate input
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

      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          errors.password = 'Password incorrect';
          return res.status(400).json(errors);
        }
        // Create jwt payload
        const payload = {
          id: user.id,
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
      });
    })
    .catch(err => res.status(500).json(err));
};
