'use strict';

// Valuploaders controller
angular.module('valuploaders').controller('ValuploadersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Valuploaders',
	function($scope, $stateParams, $location, Authentication, Valuploaders) {
		$scope.authentication = Authentication;

		// Create new Valuploader
		$scope.create = function() {
			// Create new Valuploader object
			var valuploader = new Valuploaders ({
				name: this.name
			});

			// Redirect after save
			valuploader.$save(function(response) {
				$location.path('valuploaders/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Valuploader
		$scope.remove = function(valuploader) {
			if ( valuploader ) { 
				valuploader.$remove();

				for (var i in $scope.valuploaders) {
					if ($scope.valuploaders [i] === valuploader) {
						$scope.valuploaders.splice(i, 1);
					}
				}
			} else {
				$scope.valuploader.$remove(function() {
					$location.path('valuploaders');
				});
			}
		};

		// Update existing Valuploader
		$scope.update = function() {
			var valuploader = $scope.valuploader;

			valuploader.$update(function() {
				$location.path('valuploaders/' + valuploader._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Valuploaders
		$scope.find = function() {
			$scope.valuploaders = Valuploaders.query();
		};

		// Find existing Valuploader
		$scope.findOne = function() {
			$scope.valuploader = Valuploaders.get({ 
				valuploaderId: $stateParams.valuploaderId
			});
		};
	}
]);