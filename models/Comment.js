const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  body: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  cast: {
    type: Schema.Types.ObjectId,
    ref: 'Cast'
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;