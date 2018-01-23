'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
