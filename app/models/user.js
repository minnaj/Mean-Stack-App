'use strict';

var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

// User model
var UserSchema = new Schema({
	id 			: { type : String },
	firstName 	: { type : String, default : '' }
});

module.exports = mongoose.model( 'User', UserSchema );
