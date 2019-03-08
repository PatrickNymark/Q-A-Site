const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Load Model
const User = require('../../models/User');

router.get('/', (req, res) => {
  res.json('test');
});

router.post('/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (user) {
      res.status(400).json({ msg: 'User already exists' });
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

module.exports = router;
