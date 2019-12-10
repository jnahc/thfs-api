const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Password is required'],
  },
  picture: {
    type: String,
  },
  favoriteCast: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cast',
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
});

const User = mongoose.model ('User', UserSchema);

module.exports = User;