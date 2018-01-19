'use strict';

const Tweet = require('../models/tweet');
const User = require('../models/user');
const Boom = require('boom');
const Utils = require('../api/utils');

exports.find = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Tweet.find().populate('tweeter').then(tweets => {
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

  handler: function (request, reply) {
    const newTweet = new Tweet(request.payload);

    const authorization = request.headers.authorization.substring(7);
    const userId = Utils.decodeToken(authorization).userId;

    User.findOne({ _id: userId }).then(user => {
      newTweet.tweeter = user;
      newTweet.save().then(tweet => {
        Tweet.findOne(tweet).populate('tweeter').then(tweet => {
          reply(tweet).code(201);
        });
      }).catch(err => {
        reply(Boom.badImplementation('error saving tweet'));
      });
    }).catch(err => {
      reply(Boom.badImplementation('error saving tweet'));
    });
  },

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
      reply(tweet).code(204);
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },

};

exports.deleteForUser = {

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
