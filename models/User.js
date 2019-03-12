const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  resetToken: {
    type: String
  },
  resetTokenExperation: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt).then(hashedPassword => {
      user.password = hashedPassword;
      next();
    });
  });
});

module.exports = User = mongoose.model('users', UserSchema);
