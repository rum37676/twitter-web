'use strict';

const User = require('../models/user');
const Boom = require('boom');
const Utils = require('./utils.js');
const Tweet = require('../models/tweet');
const ImageStore = require('./image-store');
const Async = require('async');

exports.find = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    console.log('UserAPI: find');
    User.find({}).populate('followers').then(users => {
      reply(users);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing db'));
    });
  },

};

exports.findOne = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    console.log('UserAPI: findOne');
    User.findOne({ _id: request.params.id }).then(user => {
      if (user != null) {
        reply(user);
      }

      reply(Boom.notFound('id not found'));
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },

};

exports.create = {

  auth: false,

  handler: function (request, reply) {
    console.log('UserAPI: create');
    const user = new User(request.payload);
    user.save().then(newUser => {
      reply(newUser).code(201);
    }).catch(err => {
      // Duplicate username or email
      if (err.message.indexOf('duplicate')) {
        reply(err.message).code(409);
      } else {
        reply(Boom.badImplementation('error creating User'));
      }
    });
  },

};

exports.deleteAll = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    console.log('UserAPI: deleteAll');
    User.find({}).then(users => {
      Async.each(users, function (user, callback) {
        if (user.username !== 'root') {
          user.remove().then(res => {
            ImageStore.deleteImage(user.image_id, function () {
            });
          });
        }
      });

      Tweet.remove({});
      reply().code(204);
    }).catch(err => {
      reply(Boom.badImplementation('error removing Users'));
    });
  },

};

exports.deleteOne = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    console.log('UserAPI: deleteOne');
    console.log('try delete User: ' + request.params.id);
    User.findOne({ _id: request.params.id }).then(user => {
      if (user.username !== 'root') {
        user.remove();
        ImageStore.deleteImage(user.image_id, function () {
        });

        Tweet.find({ tweeter: request.params.id }).then(tweets => {
          Async.each(tweets, function (tweet, callback) {
            tweet.remove().then(res => {
              ImageStore.deleteImage(tweet.image_id, function () {
              });
            });
          });
        }).catch(err => {
          reply(Boom.notFound('id not found'));
        });

        reply().code(204);
      } else {
        reply().code(403);
      }
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },

};

exports.addFollower = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    console.log('UserAPI: addFollower');
    const authorization = request.auth.token;
    const userInfo = Utils.decodeToken(authorization);

    User.update({ _id: request.params.id }, { $push: { followers: userInfo.userId } }).then(user => {
      User.findOne({ _id: request.params.id }).populate('followers').then(user => {
        reply(user).code(200);
      });
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },

};

exports.deleteFollower = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    console.log('UserAPI: deleteFollower');
    const authorization = request.auth.token;
    const userInfo = Utils.decodeToken(authorization);

    User.update({ _id: request.params.id }, { $pull: { followers: userInfo.userId } }).then(user => {
      User.findOne({ _id: request.params.id }).populate('followers').then(user => {
        reply(user).code(200);
      });
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },

};

exports.authenticate = {

  auth: false,

  handler: function (request, reply) {
    console.log('UserAPI: authenticate');
    const user = request.payload;
    User.findOne({ email: user.email }).then(foundUser => {
      if (foundUser && foundUser.password === user.password) {
        const token = Utils.createToken(foundUser);
        reply({ success: true, token: token, user: foundUser }).code(201);
      } else {
        reply({ success: false, message: 'Authentication failed. User not found.' }).code(201);
      }
    }).catch(err => {
      reply(Boom.notFound('internal db failure'));
    });
  },

};

exports.findMe = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    console.log('UserAPI: findMe');
    const authorization = request.auth.token;
    const userInfo = Utils.decodeToken(authorization);

    User.findOne({ _id: userInfo.userId }).populate('followers').then(user => {
      reply(user).code(200);
    }).catch(err => {
      reply(Boom.badImplementation('error finding user'));
    });
  },

};

exports.updateMe = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    console.log('UserAPI: updateMe');
    const authorization = request.auth.token;
    const userInfo = Utils.decodeToken(authorization);

    User.findOneAndUpdate({ _id: userInfo.userId }, request.payload).then(user => {
      reply(user).code(200);
    }).catch(err => {
      reply(Boom.badImplementation('error finding user'));
    });
  },

};

exports.addProfilImage = {

  auth: {
    strategy: 'jwt',
  },

  payload: {
    output: 'stream',
    allow: ['multipart/form-data', 'application/json'],
    maxBytes: '104857600',
  },

  handler: function (request, reply) {
    console.log('UserAPI: addProfilImage');
    const authorization = request.auth.token;
    const userInfo = Utils.decodeToken(authorization);
    const data = request.payload;

    if (typeof data.profilImage !== 'undefined') {
      console.log('uploadProfilImage');
      ImageStore.uploadProfilImage(userInfo.userId, data.profilImage, function (user) {
        reply(user).code(202);
      });
    }
  },

};

exports.validateUser = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    console.log('UserAPI: validateUser');
    reply().code(200);
  },

};
