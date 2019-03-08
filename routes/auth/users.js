const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Controllers
const authController = require('../../controllers/auth/authController');

// Load Models
const User = require('../../models/User');

// @route   GET api/auth/
// @desc    Get all users
// @access  Public
router.get('/', (req, res) => {
  User.find().then(users => res.json(users));
});

// @route   POST api/auth/register
// @desc    Register new user route
// @access  Public
router.post('/register', authController.registerUser);

// @route   POST api/auth/login
// @desc    User login route
// @access  Public
router.post('/login', authController.loginUser);

module.exports = router;
