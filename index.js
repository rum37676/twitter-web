'use strict';

const Hapi = require('hapi');
const corsHeaders = require('hapi-cors-headers');
const utils = require('./app/api/utils.js');

var server = new Hapi.Server();
server.connection({ port: process.env.PORT || 4000 });

server.register([require('inert'), require('vision'), require('hapi-auth-cookie'), require('hapi-auth-jwt2')], err => {

  if (err) {
    throw err;
  }

  server.auth.strategy('standard', 'cookie', {
    password: 'secretpasswordnotrevealedtoanyone',
    cookie: 'donation-cookie',
    isSecure: false,
    ttl: 24 * 60 * 60 * 1000,
    redirectTo: '/login',
  });

  server.auth.strategy('jwt', 'jwt', {
    key: 'secretpasswordnotrevealedtoanyone',
    validateFunc: utils.validate,
    verifyOptions: { algorithms: ['HS256'] },
  });

  server.auth.default({
    strategy: 'standard',
  });

  server.views({
    engines: {
      hbs: require('handlebars'),
    },
    relativeTo: __dirname,
    path: './app/views',
    layout: true,
    isCached: false,
  });

  require('./app/models/db');

  server.ext('onPreResponse', corsHeaders);
  server.route(require('./routes'));
  server.route(require('./routesapi'));

  server.start((err) => {
    if (err) {
      throw err;
    }

    console.log('Server listening at:', server.info.uri);
  });

});
