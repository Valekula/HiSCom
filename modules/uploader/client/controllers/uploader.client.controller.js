'use strict';

angular
    .module('uploader')
    .controller('UploaderController', UploaderController);
    //.factory('UploaderService'); 

UploaderController.$inject = ['$scope', '$http','FileUploader', 'UploaderService'];

//app.controller('SecumapsController', ['$rootScope', '$scope', '$compile', 

function UploaderController($scope, $http, FileUploader, UploaderService) {

	var uploader = $scope.uploader = new FileUploader({
		url: 'api/uploader',
		alias: 'uploadPictures'
	});

/*

	$scope.setUploaderParams = function () {
								
		var data = { "dest": './modules/articles/client/img/' };

		var uploaderParams = {
	      "dest": './modules/articles/client/img/', // Profile upload destination path
	      "limits": {
	        "fileSize": 5*1024*1024 // Max file size in bytes (1 MB)
	      }
	    };

	    $http.put('/api/uploader?', uploaderParams)
	    .success(function (data, status, headers) {
	        console.log("success");
	    })
	    .error(function (data, status, header, config) {
	    	console.log("Error");
	    });
	};
*/
	var imageList = [];
	var imagespath = './modules/articles/client/img/';

	// Set file uploader image filter
	$scope.uploader.filters.push({
		name: 'imageFilter',
		fn: function (item, options) {
			var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
			return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
		}
	});

	// CALLBACKS

	uploader.onWhenAddingFileFailed = function(item , filter, options) {
		console.info('onWhenAddingFileFailed', item, filter, options);
	};
	uploader.onAfterAddingFile = function(fileItem) {
		console.info('onAfterAddingFile', fileItem);
	};
	uploader.onAfterAddingAll = function(addedFileItems) {
		console.info('onAfterAddingAll', addedFileItems);
	};
	uploader.onBeforeUploadItem = function(item) {
		console.info('onBeforeUploadItem', item);
	};
	uploader.onProgressItem = function(fileItem, progress) {
		console.info('onProgressItem', fileItem, progress);
	};
	uploader.onProgressAll = function(progress) { 
		console.info('onProgressAll', progress);
	};
	uploader.onSuccessItem = function(fileItem, response, status, headers) {
		console.info('onSuccessItem', fileItem, response, status, headers);
	};
	uploader.onErrorItem = function(fileItem, response, status, headers) {
		console.info('onErrorItem', fileItem, response, status, headers);
	};
	uploader.onCancelItem = function(fileItem, response, status, headers) {
		console.info('onCancelItem', fileItem, response, status, headers);
		console.log(response);
	};
	uploader.onCompleteItem = function(fileItem, response, status, headers) {
		console.info('onCompleteItem', fileItem, response, status, headers);

		console.log('response = ' + response);
		UploaderService.addFile(imagespath + response);
		console.log('getListFiles = ' + UploaderService.getListFiles());
		//imageList.push(imagespath + response);
	};
	uploader.onCompleteAll = function() {
		console.info('onCompleteAll');
	};

	console.info('uploader', uploader);
}
/*
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
*/
