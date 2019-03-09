// Load Model
const Profile = require('../../models/Profile');

/*

  __ADD OR UPDATE PROFILE

*/
exports.addOrUpdateProfile = (req, res) => {
  const { intro, company } = req.body;

  const profileFields = {};
  profileFields.intro = intro;
  profileFields.company = intro;

  Profile.find({ user: req.user.id }).then(profile => {
    if (profile) {
      // Update profil
      Profile.findByOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile));
    } else {
      // Create and save new profile
      new Profile(profileFields).save().then(profile => res.json(profile));
    }
  });
};
