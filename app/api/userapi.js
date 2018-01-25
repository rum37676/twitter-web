'use strict';

const User = require('../models/user');
const Boom = require('boom');
const Utils = require('./utils.js');

exports.find = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
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
    const user = new User(request.payload);
    user.save().then(newUser => {
      reply(newUser).code(201);
    }).catch(err => {
      reply(Boom.badImplementation('error creating User'));
    });
  },

};

exports.deleteAll = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    User.remove({}).then(err => {
      reply(User).code(204);
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
    User.remove({ _id: request.params.id }).then(user => {
      reply().code(204);
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
    const user = request.payload;
    User.findOne({ email: user.email }).then(foundUser => {
      if (foundUser && foundUser.password === user.password) {
        const token = Utils.createToken(foundUser);
        reply({ success: true, token: token }).code(201);
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
    const authorization = request.auth.token;
    const userInfo = Utils.decodeToken(authorization);

    console.log(request.payload);

    User.findOneAndUpdate({ _id: userInfo.userId }, request.payload).then(user => {
      reply(user).code(200);
    }).catch(err => {
      reply(Boom.badImplementation('error finding user'));
    });
  },

};
