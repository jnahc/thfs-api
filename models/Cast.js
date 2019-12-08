const mongoose = require ('mongoose');

const CastSchema = mongoose.Schema({
  number: {
    type: String,
    required: [true, 'Name is required'],
  },
  englishName: {
    type: String
  },
  japaneseName: {
    type: String
  },
  nickName: {
    type: String
  },
  occupation: {
    type: String
  },
  birthDate: {
    type: Date
  },
  gender: {
    type: String
  },
  firstEpisodeAppeared: {
    type: Number
  },
  lastEpisodeAppeared: {
    type: Number
  },
  mainPicture: {
    type: String
  },
  picture1: {
    type: String
  },
  picture2: {
    type: String
  },
  seasonsActive: [{
    type: Number
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  couples: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Couple',
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }]
});

const Cast = mongoose.model('Cast', CastSchema);

module.exports = Cast;