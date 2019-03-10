// Load Model
const Profile = require('../../models/Profile');

/*

  __ADD OR UPDATE PROFILE

*/
exports.addOrUpdateProfile = (req, res) => {
  const {
    intro,
    company,
    website,
    location,
    skills,
    interests,
    bio
  } = req.body;

  const profileFields = {};
  profileFields.user = req.user;
  profileFields.intro = intro;
  profileFields.company = company;
  profileFields.website = website;
  profileFields.location = location;
  profileFields.bio = bio;

  const skillsArray = skills.split(', ');
  const interestArray = interests.split(', ');

  profileFields.skills = skillsArray;
  profileFields.interests = interestArray;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (!profile) {
      new Profile(profileFields).save().then(profile => res.json(profile));
    } else {
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, useFindAndModify: false }
      ).then(profile => res.json(profile));
    }
  });
};

/*

  __ADD EXPERIENCE

*/
exports.addExperience = (req, res) => {
  const { title, description, company, location, current } = req.body;

  Profile.findOne({ user: req.user.id }).then(profile => {
    // Create experience payload
    const newExperience = {
      title,
      description,
      company,
      location,
      current
    };

    // Add experience to beginning of array
    profile.experiences.unshift(newExperience);

    // Save updated profile
    profile.save().then(profile => res.json(profile));
  });
};
