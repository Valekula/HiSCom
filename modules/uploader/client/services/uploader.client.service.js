(function () {
  'use strict';

  angular
    .module('uploader.services')
    .factory('UploaderService', UploaderService);

  function UploaderService() {
  var service = [];

  var uploaderParams = '';
  var listFiles = [];

  service.setUploaderParams = function (value) {
      uploaderParams = value;
      listFiles = [];
    };

    service.getUploaderParams = function () {
      return uploaderParams;
    };

    service.addFile = function (value) {
      listFiles.push(value);
    };

    service.getListFiles = function (value) {
      return listFiles;
    };

  return service;  
}
  
})();
