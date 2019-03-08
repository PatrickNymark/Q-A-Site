const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Model
const User = require('../../models/User');

router.get('/', (req, res) => {
  User.find().then(users => res.json(users));
});

router.post('/register', (req, res) => {
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
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(400).json({ msg: 'Email does not exist' });
      }

      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            res.status(400).json({ msg: 'Password Incorrect' });
          }

          const payload = {
            id: user._id,
            name: user.firstName + ' ' + user.lastName
          };

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
});

module.exports = router;
