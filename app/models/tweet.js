'use strict';

const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  tweeter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  image_id: {
    type: String,
  },
  image_src: {
    type: String,
  },
});

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;
