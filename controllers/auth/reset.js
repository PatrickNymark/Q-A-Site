const crypto = require('crypto');

// Load model
const User = require('../../models/User');

// Load mailer
const transporter = require('../../middleware/mailer');

/*

  __FORGOT PASSWORD

*/
exports.forgotPassword = (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(400).json({ notfound: 'User not found' });
    }

    // Create token, and set expire date
    user.passwordResetToken = crypto.randomBytes(16).toString('hex');
    user.passwordResetExpires = Date.now() + 360000;

    // Save user
    user
      .save()
      .then(user => {
        var mailOptions = {
          from: 'quora-help@replica.com',
          to: user.email,
          subject: 'Quroa Replica - Reset Password ',
          html: `
          <h4>Hello, ${user.firstName}</h4>
          <p>You have requested to reset your password, confirm reset by clicking: <a href="http://${
            req.headers.host
          }/reset/${user.passwordResetToken}">Reset Password</a></p>
      `
        };

        // Send mail with verification token
        transporter.sendMail(mailOptions, function(err) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
          res.json({
            msg: `A verification email has been sent to ${user.email}`
          });
        });
      })
      .catch(err => res.status(500).json(err.message));
  });
};

/*

  __RESET PASSWORD

*/
exports.resetPassword = (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  // Search for user with token, and check for expire date
  User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() }
  })
    .then(user => {
      console.log(user);
      if (!user) {
        return res.status(400).json({
          expired: 'Reset Password token has expired, please try again'
        });
      }

      // update user info
      user.password = newPassword;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;

      // save new user
      user
        .save()
        .then(user => {
          const mailOptions = {
            to: user.email,
            from: 'quora-help@replica.com',
            subject: 'Password successfully reset',
            html: `
              <h4>You have succesfully reset your password</h4>
              <p>Go too your profile here: <a href="http://localhost:3000/dashboard">Profile</a></p>
            `
          };

          transporter.sendMail(mailOptions, err => {
            if (err) {
              return res.status(500).json(err);
            }

            res.json(user);
          });
        })
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
};
