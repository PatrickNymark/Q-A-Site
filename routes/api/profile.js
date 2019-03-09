const express = require('express');
const router = express.Router();

// Load Model
const Profile = require('../../models/Profile');

router.get('/', (req, res) => {
  Profile.find().then(profiles => {
    res.json(profiles);
  });
});

module.exports = router;
