'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Valuploader = mongoose.model('Valuploader'),
	_ = require('lodash');

/**
 * Create a Valuploader
 */
exports.create = function(req, res) {
	var valuploader = new Valuploader(req.body);
	valuploader.user = req.user;

	valuploader.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(valuploader);
		}
	});
};

/**
 * Show the current Valuploader
 */
exports.read = function(req, res) {
	res.jsonp(req.valuploader);
};

/**
 * Update a Valuploader
 */
exports.update = function(req, res) {
	var valuploader = req.valuploader ;

	valuploader = _.extend(valuploader , req.body);

	valuploader.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(valuploader);
		}
	});
};

/**
 * Delete an Valuploader
 */
exports.delete = function(req, res) {
	var valuploader = req.valuploader ;

	valuploader.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(valuploader);
		}
	});
};

/**
 * List of Valuploaders
 */
exports.list = function(req, res) { 
	Valuploader.find().sort('-created').populate('user', 'displayName').exec(function(err, valuploaders) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(valuploaders);
		}
	});
};

/**
 * Valuploader middleware
 */
exports.valuploaderByID = function(req, res, next, id) { 
	Valuploader.findById(id).populate('user', 'displayName').exec(function(err, valuploader) {
		if (err) return next(err);
		if (! valuploader) return next(new Error('Failed to load Valuploader ' + id));
		req.valuploader = valuploader ;
		next();
	});
};

/**
 * Valuploader authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.valuploader.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
