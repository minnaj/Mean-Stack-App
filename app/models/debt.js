'use strict';

var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;


// Define the debt model
var DebtSchema = new Schema(
{
	debtID 	: { type : Number, default : 0 },
	userID 	: { type : Number, default : 0 },
	name 	: { type : String, default : '', uppercase: true },
	amount 	: { type : Number, default : 0 },
	text	: { type : String, default : '' },
	edited 	: { type : Date, default : Date.now }
});

module.exports = mongoose.model( 'Debt', DebtSchema );
