'use strict';

var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;


// Define the debt model
var DebtSchema = new Schema(
{
	userID 	: { type : String },
	name 	: { type : String, uppercase: true },
	amount 	: { type : Number },
	text	: { type : String, default : '' },
	edited 	: { type : Date, default : Date.now }
});

module.exports = mongoose.model( 'Debt', DebtSchema );
