const MainView = require('./app/controllers/mainview');

module.exports = [

  { method: 'GET', path: '/', config: MainView.main },

];
