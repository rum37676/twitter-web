const MainView = require('./app/controllers/mainview');
const Assets = require('./app/controllers/assets');

module.exports = [

  { method: 'GET', path: '/', config: MainView.main },

  {
    method: 'GET',
    path: '/{param*}',
    config: { auth: false },
    handler: Assets.servePublicDirectory,
  },
];
