'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var valuploaders = require('../../app/controllers/valuploaders.server.controller');

	// Valuploaders Routes
	app.route('/valuploaders')
		.get(valuploaders.list)
		.post(users.requiresLogin, valuploaders.create);

	app.route('/valuploaders/:valuploaderId')
		.get(valuploaders.read)
		.put(users.requiresLogin, valuploaders.hasAuthorization, valuploaders.update)
		.delete(users.requiresLogin, valuploaders.hasAuthorization, valuploaders.delete);

	// Finish by binding the Valuploader middleware
	app.param('valuploaderId', valuploaders.valuploaderByID);
};
