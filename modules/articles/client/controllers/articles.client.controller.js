(function () {
  'use strict';

  angular
    .module('articles')
    .controller('ArticlesController', ArticlesController);

  ArticlesController.$inject = ['$scope', '$state', '$http', 'articleResolve', 'Authentication', 'UploaderService'];

  function ArticlesController($scope, $state, $http, article, Authentication, UploaderService) {
    var vm = this;

    vm.article = article;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    //var isShowUploads = false;
    vm.isShowUploads = false; //isShowUploads;
    vm.showUploads = showUploads;

    vm.listImages =[];

    // Remove existing Article
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.article.$remove($state.go('articles.list'));
      }
    }

    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.articleForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.article._id) {
        vm.article.$update(successCallback, errorCallback);
      } else {
        vm.article.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('articles.view', {
          articleId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    function showUploads() {
      vm.isShowUploads = !vm.isShowUploads;
      if (vm.isShowUploads === true)
          setUploaderParams();

      if (vm.isShowUploads === false)  
         vm.listImages = UploaderService.getListFiles(); 

      console.log("vm.listImages = " + vm.listImages);

      console.log("isShowUploads = " + vm.isShowUploads);
    }

    function setUploaderParams() {
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
    }
  }
})();
