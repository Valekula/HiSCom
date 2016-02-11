'use strict';

(function() {
	// Valuploaders Controller Spec
	describe('Valuploaders Controller Tests', function() {
		// Initialize global variables
		var ValuploadersController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Valuploaders controller.
			ValuploadersController = $controller('ValuploadersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Valuploader object fetched from XHR', inject(function(Valuploaders) {
			// Create sample Valuploader using the Valuploaders service
			var sampleValuploader = new Valuploaders({
				name: 'New Valuploader'
			});

			// Create a sample Valuploaders array that includes the new Valuploader
			var sampleValuploaders = [sampleValuploader];

			// Set GET response
			$httpBackend.expectGET('valuploaders').respond(sampleValuploaders);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.valuploaders).toEqualData(sampleValuploaders);
		}));

		it('$scope.findOne() should create an array with one Valuploader object fetched from XHR using a valuploaderId URL parameter', inject(function(Valuploaders) {
			// Define a sample Valuploader object
			var sampleValuploader = new Valuploaders({
				name: 'New Valuploader'
			});

			// Set the URL parameter
			$stateParams.valuploaderId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/valuploaders\/([0-9a-fA-F]{24})$/).respond(sampleValuploader);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.valuploader).toEqualData(sampleValuploader);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Valuploaders) {
			// Create a sample Valuploader object
			var sampleValuploaderPostData = new Valuploaders({
				name: 'New Valuploader'
			});

			// Create a sample Valuploader response
			var sampleValuploaderResponse = new Valuploaders({
				_id: '525cf20451979dea2c000001',
				name: 'New Valuploader'
			});

			// Fixture mock form input values
			scope.name = 'New Valuploader';

			// Set POST response
			$httpBackend.expectPOST('valuploaders', sampleValuploaderPostData).respond(sampleValuploaderResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Valuploader was created
			expect($location.path()).toBe('/valuploaders/' + sampleValuploaderResponse._id);
		}));

		it('$scope.update() should update a valid Valuploader', inject(function(Valuploaders) {
			// Define a sample Valuploader put data
			var sampleValuploaderPutData = new Valuploaders({
				_id: '525cf20451979dea2c000001',
				name: 'New Valuploader'
			});

			// Mock Valuploader in scope
			scope.valuploader = sampleValuploaderPutData;

			// Set PUT response
			$httpBackend.expectPUT(/valuploaders\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/valuploaders/' + sampleValuploaderPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid valuploaderId and remove the Valuploader from the scope', inject(function(Valuploaders) {
			// Create new Valuploader object
			var sampleValuploader = new Valuploaders({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Valuploaders array and include the Valuploader
			scope.valuploaders = [sampleValuploader];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/valuploaders\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleValuploader);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.valuploaders.length).toBe(0);
		}));
	});
}());