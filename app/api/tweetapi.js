'use strict';

const Tweet = require('../models/tweet');
const Boom = require('boom');
const Utils = require('./utils');
const ImageStore = require('./image-store');
const Async = require('async');

exports.find = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    console.log('TweetAPI: find');
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
    console.log('TweetAPI: findOne');
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
    console.log('TweetAPI: findForUser');
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
    //output: 'stream',
    allow: ['application/json', 'multipart/form-data'],
    maxBytes: '104857600',
  },

  handler: function (request, reply) {
    console.log('TweetAPI: create');
    const authorization = request.auth.token;
    const userInfo = Utils.decodeToken(authorization);
    const data = request.payload;

    if (typeof data.tweetImage === 'undefined') {
      console.log('create Tweet without image');
      const newTweet = new Tweet();
      newTweet.text = request.payload.text;
      newTweet.tweeter = userInfo.userId;

      newTweet.save().then(tweet => {
        Tweet.findOne(tweet).populate('tweeter').then(tweet => {
          reply(tweet).code(201);
        });
      }).catch(err => {
        reply(Boom.badImplementation('error creating tweet'));
      });
    } else {
      console.log('create Tweet with image');
      ImageStore.addImageTweet(userInfo.userId, data, function (tweet) {
        reply(tweet).code(201);
      });
    }
  },

};

exports.deleteAll = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    console.log('TweetAPI: deleteAll');
    Tweet.find({}).then(tweets => {
      Async.each(tweets, function (tweet, callback) {
        tweet.remove().then(res => {
          ImageStore.deleteImage(tweet.image_id, function () {
          });
        });
      });

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
    console.log('TweetAPI: deleteOne');
    Tweet.findOneAndRemove({ _id: request.params.id }).then(tweet => {
      console.log('Delete Tweet with Text: ' + tweet.text);
      ImageStore.deleteImage(tweet.image_id, function () {
        reply(tweet).code(202);
      });
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
    console.log('TweetAPI: deleteAllForUser');
    Tweet.find({ tweeter: request.params.id }).then(tweets => {
      Async.each(tweets, function (tweet, callback) {
        tweet.remove().then(res => {
          ImageStore.deleteImage(tweet.image_id, function () {
          });
        });
      });

      reply().code(204);
    }).catch(err => {
      reply(Boom.badImplementation('error removing tweets for user'));
    });
  },
};
