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
          transporter.sendMail({
            to: email,
            from: 'replica@quora.com',
            subject: 'Signup Succeed',
            html: `
              <h1>You successfully signed up</h1>
              <p>To verify account click her <a href="/api/auth/verify/${email}"></a>
            `
          });

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

      console.log(password);
      console.log(user.password);

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

/*

  __FORGOT PASSWORD

*/
exports.forgotPassword = (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      res.json(err);
    }

    console.log(req.body.email);

    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email }).then(user => {
      if (!user) {
        return res.status(400).json({ notfound: 'User not found' });
      }

      user.resetToken = token;
      user.resetTokenExperation = Date.now() + 360000; // 1 hour

      user.save().then(user => {
        transporter.sendMail({
          to: user.email,
          from: 'quora@replica.com',
          subject: 'Reset Password',
          html: `
            <h1>You have requested to reset password</h1>
            <p>Click her to reset <a href="http://localhost:3000/auth/${token}">link</a></p>
          `
        });

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
  User.findOne({ email: req.body.email }).then(user => {});
};
