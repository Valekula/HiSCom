'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Valuploader = mongoose.model('Valuploader'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, valuploader;

/**
 * Valuploader routes tests
 */
describe('Valuploader CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Valuploader
		user.save(function() {
			valuploader = {
				name: 'Valuploader Name'
			};

			done();
		});
	});

	it('should be able to save Valuploader instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Valuploader
				agent.post('/valuploaders')
					.send(valuploader)
					.expect(200)
					.end(function(valuploaderSaveErr, valuploaderSaveRes) {
						// Handle Valuploader save error
						if (valuploaderSaveErr) done(valuploaderSaveErr);

						// Get a list of Valuploaders
						agent.get('/valuploaders')
							.end(function(valuploadersGetErr, valuploadersGetRes) {
								// Handle Valuploader save error
								if (valuploadersGetErr) done(valuploadersGetErr);

								// Get Valuploaders list
								var valuploaders = valuploadersGetRes.body;

								// Set assertions
								(valuploaders[0].user._id).should.equal(userId);
								(valuploaders[0].name).should.match('Valuploader Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Valuploader instance if not logged in', function(done) {
		agent.post('/valuploaders')
			.send(valuploader)
			.expect(401)
			.end(function(valuploaderSaveErr, valuploaderSaveRes) {
				// Call the assertion callback
				done(valuploaderSaveErr);
			});
	});

	it('should not be able to save Valuploader instance if no name is provided', function(done) {
		// Invalidate name field
		valuploader.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Valuploader
				agent.post('/valuploaders')
					.send(valuploader)
					.expect(400)
					.end(function(valuploaderSaveErr, valuploaderSaveRes) {
						// Set message assertion
						(valuploaderSaveRes.body.message).should.match('Please fill Valuploader name');
						
						// Handle Valuploader save error
						done(valuploaderSaveErr);
					});
			});
	});

	it('should be able to update Valuploader instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Valuploader
				agent.post('/valuploaders')
					.send(valuploader)
					.expect(200)
					.end(function(valuploaderSaveErr, valuploaderSaveRes) {
						// Handle Valuploader save error
						if (valuploaderSaveErr) done(valuploaderSaveErr);

						// Update Valuploader name
						valuploader.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Valuploader
						agent.put('/valuploaders/' + valuploaderSaveRes.body._id)
							.send(valuploader)
							.expect(200)
							.end(function(valuploaderUpdateErr, valuploaderUpdateRes) {
								// Handle Valuploader update error
								if (valuploaderUpdateErr) done(valuploaderUpdateErr);

								// Set assertions
								(valuploaderUpdateRes.body._id).should.equal(valuploaderSaveRes.body._id);
								(valuploaderUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Valuploaders if not signed in', function(done) {
		// Create new Valuploader model instance
		var valuploaderObj = new Valuploader(valuploader);

		// Save the Valuploader
		valuploaderObj.save(function() {
			// Request Valuploaders
			request(app).get('/valuploaders')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Valuploader if not signed in', function(done) {
		// Create new Valuploader model instance
		var valuploaderObj = new Valuploader(valuploader);

		// Save the Valuploader
		valuploaderObj.save(function() {
			request(app).get('/valuploaders/' + valuploaderObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', valuploader.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Valuploader instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Valuploader
				agent.post('/valuploaders')
					.send(valuploader)
					.expect(200)
					.end(function(valuploaderSaveErr, valuploaderSaveRes) {
						// Handle Valuploader save error
						if (valuploaderSaveErr) done(valuploaderSaveErr);

						// Delete existing Valuploader
						agent.delete('/valuploaders/' + valuploaderSaveRes.body._id)
							.send(valuploader)
							.expect(200)
							.end(function(valuploaderDeleteErr, valuploaderDeleteRes) {
								// Handle Valuploader error error
								if (valuploaderDeleteErr) done(valuploaderDeleteErr);

								// Set assertions
								(valuploaderDeleteRes.body._id).should.equal(valuploaderSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Valuploader instance if not signed in', function(done) {
		// Set Valuploader user 
		valuploader.user = user;

		// Create new Valuploader model instance
		var valuploaderObj = new Valuploader(valuploader);

		// Save the Valuploader
		valuploaderObj.save(function() {
			// Try deleting Valuploader
			request(app).delete('/valuploaders/' + valuploaderObj._id)
			.expect(401)
			.end(function(valuploaderDeleteErr, valuploaderDeleteRes) {
				// Set message assertion
				(valuploaderDeleteRes.body.message).should.match('User is not logged in');

				// Handle Valuploader error error
				done(valuploaderDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Valuploader.remove().exec();
		done();
	});
});