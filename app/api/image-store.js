'use strict';

const cloudinary = require('cloudinary');
const Tweet = require('../models/tweet');
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

  addImage(userId, data, response) {
    var filename =  data.tweetImage.hapi.filename;
    var path = __dirname + '/uploads/' + filename;
    var file = fs.createWriteStream(path);

    file.on('error', function (err) {
      console.error(err);
    });

    data.tweetImage.pipe(file);
    data.tweetImage.on('end', function (err) {
      cloudinary.uploader.upload(path, result => {
        const newTweet = new Tweet({
          text: data.tweetText,
          tweeter: userId,
          image_id: result.public_id,
          image_src: result.secure_url,
        });

        newTweet.save(function (err) {
          if (err) {
            console.log('Error');
            reply().code(500);
          }

          Tweet.findOne(newTweet).populate('tweeter').then(tweet => {
            console.log('Successfully created new tweet with image');
            response(tweet);
          });
        });
      });
    });
  },

  deleteImage(imageId, response) {
    cloudinary.v2.uploader.destroy(imageId, function (result) {
      console.log('Sucessfully deleted image');
      response();
    });
  },
};

module.exports = imageStore;
