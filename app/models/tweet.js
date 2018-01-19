'use strict';

const mongoose = require('mongoose');

const candidateSchema = mongoose.Schema({
  tweeter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  text: String,
  time: { type: Date, default: Date.now },
  img: { data: Buffer, contentType: String },
});

const Candidate = mongoose.model('Tweet', candidateSchema);
module.exports = Candidate;
