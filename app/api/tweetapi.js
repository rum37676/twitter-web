'use strict';

const Tweet = require('../models/tweet');
const User = require('../models/user');
const Boom = require('boom');
const Utils = require('./utils');
const PictureStore = require('./picture-store');

exports.find = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Tweet.find().sort('-date').populate('tweeter').then(tweets => {
      reply(tweets);
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
    Tweet.findOne({ _id: request.params.id }).populate('tweeter').then(tweet => {
      if (tweet != null) {
        reply(tweet);
      }

      reply(Boom.notFound('id not found'));
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },

};

exports.findForUser = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Tweet.find({ tweeter: request.params.id }).populate('tweeter').then(tweet => {
      if (tweet != null) {
        reply(tweet);
      }

      reply(Boom.notFound('id not found'));
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },

};

exports.create = {

  auth: {
    strategy: 'jwt',
  },

  payload: {
    output: 'stream',
    allow: 'multipart/form-data',
  },

  handler: function (request, reply) {

    const authorization = request.auth.token;
    const userInfo = Utils.decodeToken(authorization);
    const data = request.payload;

    if (typeof data.tweetImage === 'undefined') {
      console.log('Tweet without picture');
      const newTweet = new Tweet();
      newTweet.text = request.payload.tweetText;
      newTweet.tweeter = userInfo.userId;

      newTweet.save().then(tweet => {
        Tweet.findOne(tweet).populate('tweeter').then(tweet => {
          console.log(tweet);
          reply(tweet).code(201);
        });
      }).catch(err => {
        reply(Boom.badImplementation('error creating tweet'));
      });
    } else {
      console.log('Tweet with picture');
      PictureStore.addPicture(userInfo.userId, data, function (tweet) {
        console.log(tweet);
        reply(tweet).code(201);
      });
    }
  },

  /*handler: function (request, reply) {
    console.log(request.payload);

    const authorization = request.auth.token;
    const userInfo = Utils.decodeToken(authorization);
    const data = request.payload;

    if (typeof data.imageList === 'undefined') {
      console.log('Tweet without picture');
      const newTweet = new Tweet();
      newTweet.text = request.payload.text;
      newTweet.tweeter = userInfo.userId;

      newTweet.save().then(tweet => {
        reply(tweet).code(201);
      }).catch(err => {
        reply(Boom.badImplementation('error creating tweet'));
      });
    } else {
      console.log('Tweet with picture');
      PictureStore.addPicture(userInfo.userId, data, function (tweet) {
        console.log(tweet);
        reply(tweet).code(201);
      });
    }
  },*/

};

exports.deleteAll = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Tweet.remove({}).then(err => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.badImplementation('error removing tweets'));
    });
  },

};

exports.deleteOne = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Tweet.remove({ _id: request.params.id }).then(tweet => {
      reply(tweet).code(202);
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },

};

exports.deleteAllForUser = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {

    Tweet.find({ tweeter: request.params.id }).remove().then(err => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.badImplementation('error removing tweets for user'));
    });
  },
};
