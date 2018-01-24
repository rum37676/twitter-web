'use strict';

const assert = require('chai').assert;
const TwitterService = require('./twitter-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Tweet API tests', function () {

  let users = fixtures.users;
  let tweets = fixtures.tweets;
  let newUser = fixtures.newUser;

  const twitterService = new TwitterService(fixtures.twitterServiceLocal);

  beforeEach(function () {
    twitterService.login(users[0]);
    twitterService.deleteAllTweets();
  });

  afterEach(function () {
    twitterService.deleteAllTweets();
    twitterService.logout();
  });

  test('create a tweet', function () {
    twitterService.createTweet(tweets[0]);
    const returnedTweets = twitterService.getTweets();
    assert.equal(returnedTweets.length, 1);
    assert.isDefined(returnedTweets[0].time);
    assert.isDefined(returnedTweets[0].tweeter);
    assert(_.some([returnedTweets[0].tweeter], users[0]), 'returned donor must be a superset of user');
  });

  test('create multiple tweets', function () {
    for (var i = 0; i < tweets.length; i++) {
      twitterService.createTweet(tweets[i]);
    }

    const returnedTweets = twitterService.getTweets();
    assert.equal(returnedTweets.length, tweets.length);
    for (var i = 0; i < tweets.length; i++) {
      assert(_.some([returnedTweets[i]], tweets[i]), 'returned donation must be a superset of donation');
    }
  });

  test('delete all tweets', function () {
    for (var i = 0; i < tweets.length; i++) {
      twitterService.createTweet(tweets[i]);
    }

    const d1 = twitterService.getTweets();
    assert.equal(d1.length, tweets.length);
    twitterService.deleteAllTweets();
    const d2 = twitterService.getTweets();
    assert.equal(d2.length, 0);
  });

  test('get/delete one tweet by id', function () {

    const newTweet = twitterService.createTweet(tweets[0]);
    const newTweet2 = twitterService.createTweet(tweets[1]);

    const d1 = twitterService.getTweets();
    assert.equal(d1.length, 2);

    const returnedTweet = twitterService.getTweet(newTweet._id);
    assert.deepEqual(returnedTweet, newTweet);
    twitterService.deleteOneTweet(newTweet._id);

    const noTweet = twitterService.getTweet(newTweet._id);
    assert.isNull(noTweet);

    const d2 = twitterService.getTweets();
    assert.equal(d2.length, 1);

    assert(_.some([newTweet2], tweets[1]), 'returned donation must be a superset of donation');
  });

  test('get/delete tweet for user', function () {

    const returnedUser = twitterService.createUser(newUser);
    twitterService.logout();
    twitterService.login(newUser);

    const returnedTweets1 = twitterService.getTweetsForUser(returnedUser._id);
    assert.equal(returnedTweets1.length, 0);

    for (var i = 0; i < tweets.length; i++) {
      twitterService.createTweet(tweets[i]);
    }

    const returnedTweets2 = twitterService.getTweetsForUser(returnedUser._id);
    assert.equal(returnedTweets2.length, tweets.length);

    for (var i = 0; i < tweets.length; i++) {
      assert(_.some([returnedTweets2[i]], tweets[i]), 'returned donation must be a superset of donation');
    }

    twitterService.deleteTweetsForUser(returnedUser._id);
    const returnedTweets3 = twitterService.getTweetsForUser(returnedUser._id);
    assert.equal(returnedTweets3.length, 0);

    twitterService.deleteOneUser(returnedUser._id);
  });
});
