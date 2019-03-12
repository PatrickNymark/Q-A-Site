const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const crypto = require('crypto');

// Load mailer
const transporter = require('../../middleware/mailer').transporter;

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

      const newUser = new User({
        firstName,
        lastName,
        email,
        password
      });

      newUser
        .save()
        .then(user => {
          // Send signup succes mail
          user.sendSignupMail();

          res.json(user);
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

      // Check for correct password
      if (!user.comparePassword) {
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
};

/*

  __FORGOT PASSWORD

*/
exports.forgotPassword = (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      res.status(400).json(err.message);
    }

    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email }).then(user => {
      if (!user) {
        return res.status(400).json({ notfound: 'User not found' });
      }

      user.resetToken = token;
      user.resetTokenExperation = Date.now() + 360000; // 1 hour

      user.save().then(user => {
        user.sendResetPasswordMail();

        res.json(user);
      });
    });
  });
};

/*

  __RESET PASSWORD

*/
exports.resetPassword = (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  User.findOne({ resetToken: token }).then(user => {
    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExperation = undefined;

    user.save().then(user => {
      transporter.sendMail({
        to: user.email,
        from: 'quora@mail.com',
        subject: 'Password successfully reset',
        html: `
          <h1>Your password was succesfully reset</h1>
        `
      });
      res.json(user);
    });
  });
};

/*

  __VERIFY USER

*/
exports.verifyUser = (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    const token = buffer.toString('hex');

    User.findOne({ email: req.params.email });
  });
  User.findOne({ email: req.params.email }).then(user => {
    user.isVerfied = true;

    user.save().then(user => res.json(user));
  });
};
