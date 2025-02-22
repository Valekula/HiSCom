'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Valuploader Schema
 */
var ValuploaderSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Valuploader name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Valuploader', ValuploaderSchema);