// Modules
var bodyParser = require( 'body-parser' );
var express = require( 'express' );
var app = express();
var methodOverride = require( 'method-override' );
var passport = require( './app/passport' );
var session = require( 'express-session' );
var cookieParser = require( 'cookie-parser' );

// Configuration
var db = require( './config/db' );
var port = process.env.PORT || 8080;
var mongoose = require( 'mongoose' );
mongoose.connect( 'mongodb://localhost/local' );

app.use( bodyParser.json() );
app.use( bodyParser.json({ type : 'application/vnd.api+json' }));
app.use( bodyParser.urlencoded({ extended: true }));
app.use( methodOverride( 'X-HTTP-Method-Override' ));
app.use( express.static( __dirname + '/public' ));
app.use( cookieParser() );
app.use( session({ secret: 'thecakeisalie' }));
app.use( passport.initialize() );
app.use( passport.session() );

require( './app/routes' )(app);

// Start app
app.listen( port );
console.log( 'Action @' + port );