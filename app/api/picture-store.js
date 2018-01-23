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

const pictureStore = {

  addPicture(userId, data, response) {
    var name =  data.tweetImage.hapi.filename;
    var path = __dirname + '/uploads/' + name;
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
            console.log('Successfully created new tweet with picture');
            response(tweet);
          });
        });
      });
    });
  },

  /*deletePicture(userId, image) {
    const id = path.parse(image);
    let album = this.getAlbum(userId);
    _.remove(album.photos, { img: image });
    cloudinary.api.delete_resources([id.name], function (result) {
      console.log(result);
    });
  },

  deleteAllPictures(userId) {
    let album = this.getAlbum(userId);
    if (album) {
      album.photos.forEach(photo => {
        const id = path.parse(photo.img);
        cloudinary.api.delete_resources([id.name], result => {
          console.log(result);
        });
      });
      this.store.remove(this.collection, album);
    }
  },*/
};

module.exports = pictureStore;
