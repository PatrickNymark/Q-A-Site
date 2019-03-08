const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// Load Model
const User = require('../../models/User');

/*
  __REGISTER USER
*/
exports.registerUser = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  User.findOne({ email }).then(user => {
    // Check if user exists
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
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
          .catch(err => res.status(400).json(err));
      });
    });
  });
};

/*
  __LOGIN USER
*/

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      // User not found
      if (!user) {
        return res.status(400).json({ msg: 'Email does not exist' });
      }

      // Compare password with crypted
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          // Passwords dont match
          if (!isMatch) {
            res.status(400).json({ msg: 'Password Incorrect' });
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
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
};
