'use strict';

var Debt = require( './models/debt' );
var User = require( './models/user' );
var passport = require( 'passport' );


module.exports = function( app ){

	// Get all debts
	app.get( '/api/debts', function( req, res ){		
		Debt.find( {}, null, {sort: {name: 1}}, function( err, debts ){
			if( err ){
				console.log( err );
				//res.send( err );
			}
		
			res.json( debts ); // Return debts in JSON form
		});
	});


	// Save/change a debt
	app.post( '/api/debts', function( req, res ){		
		var newDebt = new Debt({
			debtID: 0,
			userID: 0,
			name: req.body.name,
			amount: req.body.amount,
			text: req.body.description,
			edited: Date.now()
  		});

  		newDebt.save( function( err ){
  			if( err ){
  				console.log( err );
  				//res.send( err );
  			}
  		});

  		res.send(200);
	});

	// Get user information
	app.get( '/api/account', function( req, res ){
		if( req.user ){
			res.status(200).send({ username : req.user.firstName });
		}

		else {
			res.status(401).send();
		}
	});



	// --- Google login ---

	// Redirect to Google for authentication
	app.get( '/auth/google', passport.authenticate( 'google', {
		scope: ['https://www.googleapis.com/auth/userinfo.profile']
	}),
	function( req, res ){}); // Will not be called :-D

	//Redirect back
	app.get( '/auth/google/callback', passport.authenticate( 'google', {
		failureRedirect: '/'
	}),
	function( req, res ){
		res.redirect( '/' );
	});

	// User wants to log out
	app.get( '/logout', function( req, res ){
		req.logout();
		res.redirect( '/' );
	});


	
	app.get( '*', function( req, res ){
		res.sendfile( './public/views/index.html' );
	});
};
