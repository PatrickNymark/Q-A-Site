const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  intro: {
    type: String,
    max: 100
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String]
  },
  interests: {
    type: [String]
  },
  bio: {
    type: String
  },
  experiences: [
    {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      from: {
        type: Date
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    instagram: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    }
  }
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);
