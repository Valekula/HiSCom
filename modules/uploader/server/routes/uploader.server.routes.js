'use strict';

module.exports = function (app) {
  // User Routes
  var uploader = require('../controllers/uploader.server.controller');


  app.route('/api/uploader')
  .post(uploader.savePictures)
  .put(uploader.setUploaderParams);

};
