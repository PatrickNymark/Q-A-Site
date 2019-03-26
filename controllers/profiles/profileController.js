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
      // Create and save new profile
      new Profile(profileFields).save().then(profile => res.json(profile));
    } else {
      // Update profile
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, useFindAndModify: false }
      ).then(profile => res.json(profile));
    }
  });
};

/*

  __ GET PROFILE

*/
exports.getProfile = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    if (!profile) {
      return res.status(400).json({ notfound: 'Profile not found' })
    }

    res.json(profile)
  })
}


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

/*  

  __DELETE EXPERIENCE

*/
exports.deleteExperience = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    //console.log(profile);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    const removeIndex = profile.experiences
      .map(exp => exp.id.toString())
      .indexOf(req.params.exp_id);

    // Check if exp exists
    if (removeIndex < 0) {
      return res.status(400).json({ msg: 'Experience not found' });
    }

    // Remove experience
    profile.experiences.splice(removeIndex, 1);

    // save updated profile
    profile.save().then(profile => res.json(profile));
  });
};

/*

  __ADD EDUCATION

*/
exports.addEducation = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    const newEducation = {
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      description: req.body.description,
      current: req.body.current
    };

    // Remove education
    profile.education.unshift(newEducation);

    // Save updated profile
    profile.save().then(profile => res.json(profile));
  });
};

/*

  __DELETE EDUCATION

*/
exports.deleteEducation = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    const removeIndex = profile.education
      .map(education => education._id.toString())
      .indexOf(req.params.edu_id);

    // Check if exists
    if (removeIndex < 0) {
      return res.json({ msg: 'Education not found' });
    }

    //  Remove education
    profile.education.splice(removeIndex, 1);

    // Save updated profile
    profile.save().then(profile => res.json(profile));
  });
};

/*

  __ADD OR UPDATE SOCIAL

*/
exports.addOrUpdateSocial = (req, res) => {
  const { facebook, instagram, linkedin, youtube } = req.body;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    const payload = {
      facebook,
      instagram,
      linkedin,
      youtube
    };

    profile.social = payload;

    profile.save().then(profile => res.json(profile));
  });
};

/* 

  __ADD OR REMOVE FOLLOW

*/
exports.addOrRemoveFollow = (req, res) => {
  const { user_id } = req.params;

  Profile.findOne({ user: user_id }).then(profile => {
    const index = profile.followers
      .map(follower => follower.toString())
      .indexOf(user_id);

    if (index < 0) {
      profile.followers.unshift(req.user);
      return profile.save().then(profile => res.json(profile));
    }

    profile.followers.splice(index, 1);
    profile.save().then(profile => res.json(profile));
  });
};
