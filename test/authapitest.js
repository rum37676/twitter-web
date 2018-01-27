'use strict';

const assert = require('chai').assert;
const TwitterService = require('./twitter-service');
const fixtures = require('./fixtures.json');

suite('Auth API tests', function () {

  let users = fixtures.users;
  let loginUser = fixtures.loginUser;

  const twitterService = new TwitterService(fixtures.twitterServiceLocal);

  test('login-logout', function () {
    var returnedTweets = twitterService.getUsers();
    assert.isNull(returnedTweets);

    const response = twitterService.login(loginUser);
    returnedTweets = twitterService.getUsers();
    assert.isNotNull(returnedTweets);

    twitterService.logout();
    returnedTweets = twitterService.getUsers();
    assert.isNull(returnedTweets);
  });
});
