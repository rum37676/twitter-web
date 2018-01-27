'use strict';

const cloudinary = require('cloudinary');
const Tweet = require('../models/tweet');
const User = require('../models/user');
const fs = require('fs');

try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch (e) {
  console.log('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const imageStore = {

  addImageTweet(userId, data, response) {
    var filename =  data.tweetImage.hapi.filename;
    var path = __dirname + '/uploads/' + filename;
    var file = fs.createWriteStream(path);

    file.on('error', function (err) {
      console.error(err);
    });

    data.tweetImage.pipe(file);
    data.tweetImage.on('end', function (err) {
      cloudinary.uploader.upload(path, result => {
        //console.log(result);

        const newTweet = new Tweet({
          text: data.text,
          tweeter: userId,
          image_id: result.public_id,
          image_src: result.secure_url,
        });

        newTweet.save(function (err) {
          if (err) {
            console.error(err);
            reply().code(500);
          }

          Tweet.findOne(newTweet).populate('tweeter').then(tweet => {
            console.log('Created new tweet with image');
            response(tweet);
          });
        });
      });
    });
  },

  deleteImage(imageId, response) {
    if (imageId === 'uz8vrepoplthcjwxdpc1') {
      response();
    } else {
      cloudinary.v2.uploader.destroy(imageId, function (result) {
        console.log('Deleted image');
        response();
      });
    }
  },

  uploadProfilImage(userId, image, response) {
    var filename =  image.hapi.filename;
    var path = __dirname + '/uploads/' + filename;
    var file = fs.createWriteStream(path);

    file.on('error', function (err) {
      console.error(err);
    });

    image.pipe(file);
    image.on('end', function (err) {
      cloudinary.uploader.upload(path, result => {

        User.findOne({ _id: userId }).then(user => {

          if (user.image_id !== 'uz8vrepoplthcjwxdpc1') {
            imageStore.deleteImage(user.image_id, function () {});
          }

          user.image_id = result.public_id;
          user.image_src = result.secure_url;
          user.save().then(res => {
            console.log('Uploaded profil image to ' + user.username);
            response(user);
          });
        }).catch(err => {
          console.error(err);
          reply().code(500);
        });
      });
    });
  },
};

module.exports = imageStore;
