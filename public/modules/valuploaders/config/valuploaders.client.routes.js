'use strict';

//Setting up route
angular.module('valuploaders').config(['$stateProvider',
	function($stateProvider) {
		// Valuploaders state routing
		$stateProvider.
		state('listValuploaders', {
			url: '/valuploaders',
			templateUrl: 'modules/valuploaders/views/list-valuploaders.client.view.html'
		}).
		state('createValuploader', {
			url: '/valuploaders/create',
			templateUrl: 'modules/valuploaders/views/create-valuploader.client.view.html'
		}).
		state('viewValuploader', {
			url: '/valuploaders/:valuploaderId',
			templateUrl: 'modules/valuploaders/views/view-valuploader.client.view.html'
		}).
		state('editValuploader', {
			url: '/valuploaders/:valuploaderId/edit',
			templateUrl: 'modules/valuploaders/views/edit-valuploader.client.view.html'
		});
	}
]);