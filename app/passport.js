var User = require( './models/user' );
var passport = require( 'passport' );
var GoogleStrategy = require( 'passport-google-oauth' ).OAuth2Strategy;
var GOOGLE_CLIENT_ID = "your-client-id-here";
var GOOGLE_CLIENT_SECRET = "your-secret-here";



passport.serializeUser( function ( user, done ){
	done( null, user.id );
});

passport.deserializeUser( function( userID, done ){
	User.findOne({ id : userID }, function( err, user ){
		done( err, user );
	});
});


passport.use( new GoogleStrategy ({
	clientID: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	callbackURL: 'http://127.0.0.1:8080/auth/google/callback'
},
function( accessToken, refreshToken, profile, done ){
	process.nextTick( function(){
		User.findOne({ id : profile.id }, // Search user from local DB
		function( err, user ){
			if( err ){
				console.log( err );
				return done( err );
			}
		
			if( !user ){ // No user found, create new
				var user = new User({
					id : profile.id,
					firstName : profile.name.givenName
				});
				
				user.save( function( err ){
					if( err ){
						console.log( err );
						return done( err );
					}

					console.log( "New user saved." );
					return done( null, user );
				});
			}

			else { // User found in DB
				return done( null, user );
			}
		});
	});
}));

module.exports = passport;
