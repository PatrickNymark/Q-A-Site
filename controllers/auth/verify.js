const crypto = require('crypto');

// Load model
const Token = require('../../models/Token');
const User = require('../../models/User');

// Load mailer
const transporter = require('../../middleware/mailer');

/*

  __VERIFY USER

*/
exports.verifyUser = (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    // Check if user is verified
    if (user.isVerified) {
      return res.status(400).json({ msg: 'User is already verified' });
    }

    // Create token
    const token = crypto.randomBytes(16).toString('hex');
    const newToken = new Token({
      user: user._id,
      token
    });

    // Check if user already have token
    Token.findOne({ user: user })
      .then(token => {
        if (token) {
          return res
            .status(400)
            .json({ msg: 'User has already requested to be verified' });
        }
      })
      .catch(err => res.status(500).json(err.message));

    // Create token and send email with confirm link
    newToken
      .save()
      .then(token => {
        const mailOptions = {
          to: user.email,
          from: 'quora-confirm@replica.com',
          subject: 'Verify User',
          html: `<h4>You are almost there!</h4><p>Click link to complete <a href="http://localhost:5000/api/auth/verify/${
            token.token
          }">Verify User</a></p>`
        };
        // Send mail
        transporter.sendMail(mailOptions, err => {
          if (err) {
            return res.status(500).json(err);
          }

          res.json('A verification link is send to the email: ' + user.email);
        });
      })
      .catch(err => res.status(500).json(err.message));
  });
};

/*

  __CONFIRM USER

*/
exports.confirmUser = (req, res) => {
  const { token } = req.params;

  Token.findOne({ token: token }).then(token => {
    if (!token) {
      return res.status(400).json({
        msg: 'Token does not exist or token has expired, please try again'
      });
    }

    User.findOne({ _id: token.user })
      .then(user => {
        if (!user) {
          return res
            .status(500)
            .json({ msg: 'Something went wrong, please try again' });
        }

        user.isVerified = true;
        user
          .save()
          .then(user => {
            token
              .remove()
              .then(token =>
                res.json({ msg: 'You have succesfully verified your account' })
              );
          })
          .catch(err => res.status(500).json(err.message));
      })
      .catch(err => res.status(500).json(err.message));
  });
};
