'use strict';

const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  tweeter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  text: String,
  date: { type: Date, default: Date.now },
  image_id: String,
  image_src: String,

  //images: [{ image_id: { type: String }, image_src: { type: String } }],
});

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;
