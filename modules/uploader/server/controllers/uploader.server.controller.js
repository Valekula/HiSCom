'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config'));//,
 // User = mongoose.model('User');


/**
 * Update profile picture
 */

var uploadsDest = './modules/uploader/client/temp/';

var uploaderParams = {};

exports.savePictures = function (req, res) {
  //var user = req.user;

  console.log('savePictures');

  console.log('savePictures uploaderParams.dest = ' + uploaderParams.dest);

  console.log('config.uploads.tempfileUpload = '    + config.uploads.tempfileUpload);



  //var upload = multer(config.uploads.tempfileUpload).single('uploadPictures');//.array('uploadPictures', 12);

  var upload = multer(uploaderParams).single('uploadPictures');


  var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;
  
  // Filtering to upload only images
  upload.fileFilter = profileUploadFileFilter;

  upload.fileFilter = profileUploadFileFilter;

  upload(req, res, function (uploadError) {

      console.log('uppload');
      if(uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading profile picture'
        });
      }
      else{

          console.log('req.file.filename = ' + req.file.filename);  //storaged file name
          res.send(req.file.filename);
      } 
    
    });

};

exports.setUploaderParams = function (req, res) {

    console.log('setUploaderParams');
    console.log('req.uploaderParams = ' + JSON.stringify(req.body));
    uploaderParams = req.body;
    console.log('uploaderParams.dest = ' + uploaderParams.dest);
};
