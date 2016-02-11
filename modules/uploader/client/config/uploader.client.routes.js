(function () {
  'use strict';

  angular
    .module('uploader.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    console.log('uploader routeConfig');
    $stateProvider
      .state('uploader', {
        url: '/uploader',
        templateUrl: 'modules/uploader/client/views/uploader.client.view.html',
        controller: 'UploaderController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin']
        }
      });
  }

 // $inject = ['$stateParams', 'UploaderService'];
})();
