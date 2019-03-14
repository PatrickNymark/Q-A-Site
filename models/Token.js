const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 43200 // 12 hours
  }
});

module.exports = Token = mongoose.model('tokens', TokenSchema);
