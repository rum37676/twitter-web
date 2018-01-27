'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', default: [],
  }],
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  image_id: {
    type: String,
    default: 'uz8vrepoplthcjwxdpc1',
  },
  image_src: {
    type: String,
    default: 'https://res.cloudinary.com/dnsyhxp5s/image/upload/v1516959420/uz8vrepoplthcjwxdpc1.jpg',
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
