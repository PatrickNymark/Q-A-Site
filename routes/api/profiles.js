const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load controllers
const profileController = require('../../controllers/profiles/profileController');

// @route   GET api/profiles/
// @desc    Get current profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }), profileController.getProfile
);

// @route   POST api/profiles/
// @desc    Add or update profile route
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  profileController.addOrUpdateProfile
);

// @route   POST api/profiles/experience
// @desc    Add experience route
// @access  Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  profileController.addExperience
);

// @route   DELETE api/profiles/experience
// @desc    Delete experience route
// @access  Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  profileController.deleteExperience
);

// @route   POST api/profiles/education
// @desc    Add education route
// @access  Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  profileController.addEducation
);

// @route   DELETE api/profiles/education
// @desc    Delete education route
// @access  Private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  profileController.deleteEducation
);

// @route   POST api/profiles/social
// @desc    Add social route
// @access  Private
router.post(
  '/social',
  passport.authenticate('jwt', { session: false }),
  profileController.addOrUpdateSocial
);

// @route   POST api/profiles/follow/:user_id
// @desc    Add or remove follow route
// @access  Private
router.post(
  '/follow/:user_id',
  passport.authenticate('jwt', { session: false }),
  profileController.addOrRemoveFollow
);

module.exports = router;
