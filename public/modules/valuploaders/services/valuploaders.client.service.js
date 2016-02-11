'use strict';

//Valuploaders service used to communicate Valuploaders REST endpoints
angular.module('valuploaders').factory('Valuploaders', ['$resource',
	function($resource) {
		return $resource('valuploaders/:valuploaderId', { valuploaderId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);