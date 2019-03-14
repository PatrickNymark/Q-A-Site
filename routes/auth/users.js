const express = require('express');
const router = express.Router();

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

// @route   POST api/auth/reset
// @desc    Reset password route
// @access  Public
router.post('/reset', authController.reset.forgotPassword);

// @route   POST api/auth/reset/:token
// @desc    Reset password route
// @access  Public
router.post('/reset/:token', authController.reset.resetPassword);

// @route   POST api/auth/verify
// @desc    Request to verify user route
// @access  Public
router.post('/verify/', authController.verify.verifyUser);

// @route   GET api/auth/verify/
// @desc    Verify user route
// @access  Public
router.get('/verify/:token', authController.verify.confirmUser);

module.exports = router;
