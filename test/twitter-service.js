'use strict';

const SyncHttpService = require('./sync-http-service');

class TwitterService {

  constructor(baseUrl) {
    this.httpService = new SyncHttpService(baseUrl);
  }

  getUsers() {
    return this.httpService.get('/api/users');
  }

  getUser(id) {
    return this.httpService.get('/api/users/' + id);
  }

  createUser(newUser) {
    return this.httpService.post('/api/users', newUser);
  }

  deleteAllUsers() {
    return this.httpService.delete('/api/users');
  }

  deleteOneUser(id) {
    return this.httpService.delete('/api/users/' + id);
  }

  getTweets() {
    return this.httpService.get('/api/tweets');
  }

  getTweet(id) {
    return this.httpService.get('/api/tweets/' + id);
  }

  getTweetsForUser(id) {
    return this.httpService.get('/api/users/' + id + '/tweets');
  }

  createTweet(newTweet) {
    return this.httpService.post('/api/tweets', newTweet);
  }

  deleteAllTweets() {
    return this.httpService.delete('/api/tweets');
  }

  deleteOneTweet(id) {
    return this.httpService.delete('/api/tweets/' + id);
  }

  deleteTweetsForUser(id) {
    return this.httpService.delete('/api/users/' + id + '/tweets');
  }

  login(user) {
    return this.httpService.setAuth('/api/users/authenticate', user);
  }

  logout() {
    this.httpService.clearAuth();
  }
}

module.exports = TwitterService;
