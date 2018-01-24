'use strict';

const assert = require('chai').assert;
const TwitterService = require('./twitter-service');
const fixtures = require('./fixtures.json');

suite('Auth API tests', function () {

  let users = fixtures.users;

  const twitterService = new TwitterService(fixtures.twitterServiceLocal);

  test('login-logout', function () {
    var returnedTweets = twitterService.getTweets();
    assert.isNull(returnedTweets);

    const response = twitterService.login(users[0]);
    returnedTweets = twitterService.getTweets();
    assert.isNotNull(returnedTweets);

    twitterService.logout();
    returnedTweets = twitterService.getTweets();
    assert.isNull(returnedTweets);
  });
});
