const TweetApi = require('./app/api/tweetapi');
const UserApi = require('./app/api/userapi');

module.exports = [
  { method: 'GET', path: '/api/tweets', config: TweetApi.find },
  { method: 'GET', path: '/api/tweets/{id}', config: TweetApi.findOne },
  { method: 'POST', path: '/api/tweets', config: TweetApi.create },
  { method: 'DELETE', path: '/api/tweets/{id}', config: TweetApi.deleteOne },
  { method: 'DELETE', path: '/api/tweets', config: TweetApi.deleteAll },
  { method: 'DELETE', path: '/api/users/{id}/tweets', config: TweetApi.deleteAllForUser },
  { method: 'GET', path: '/api/users/{id}/tweets', config: TweetApi.findForUser },

  { method: 'GET', path: '/api/users', config: UserApi.find },
  { method: 'GET', path: '/api/users/me', config: UserApi.findMe },
  { method: 'POST', path: '/api/users/me', config: UserApi.updateMe },
  { method: 'GET', path: '/api/users/{id}', config: UserApi.findOne },
  { method: 'POST', path: '/api/users', config: UserApi.create },
  { method: 'DELETE', path: '/api/users/{id}', config: UserApi.deleteOne },
  { method: 'DELETE', path: '/api/users', config: UserApi.deleteAll },
  { method: 'POST', path: '/api/users/follow/{id}', config: UserApi.addFollower },
  { method: 'DELETE', path: '/api/users/follow/{id}', config: UserApi.deleteFollower },
  { method: 'POST', path: '/api/users/authenticate', config: UserApi.authenticate },
  { method: 'POST', path: '/api/users/image', config: UserApi.addProfilImage },
  { method: 'GET', path: '/api/users/validate', config: UserApi.validateUser },

];
