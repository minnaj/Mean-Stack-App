'use strict';

angular.module( 'appRoutes', ['ui.router'] )

.config( function( $stateProvider, $urlRouterProvider ){
	$urlRouterProvider.otherwise( '/' );

	$stateProvider
	.state( 'login', { // Login page
		url: '/login',
		templateUrl: '/views/login.html',
		resolve: {
			auth: function( $http, $state, $rootScope ){
				$http.get( '/api/account' )
				.then( function success( res ){ // User found
					$rootScope.headerInfo = 'Logged in as ' + res.data.username;
					$rootScope.loggedIn = true;
					$state.go( 'secured.home' );
				},
				function error( reason ){ // No user logged in
					$rootScope.headerInfo = '';
					$rootScope.loggedIn = false;
				});
			}
		}
	})

	.state( 'secured', { // Pages that require login
		abstract: true,
		template: '<div ui-view></div>',
		resolve: {
			auth: function( $http, $state, $rootScope ){
				$http.get( '/api/account' )
				.then( function success( res ){ // User found
					$rootScope.headerInfo = 'Logged in as ' + res.data.username;
					$rootScope.loggedIn = true;
				},
				function error( reason ){ // No user logged in
					$rootScope.headerInfo = '';
					$rootScope.loggedIn = false;
					$state.go( 'login' );
				});
			}
		}
	})

	.state( 'secured.home', { // Home page: displays all debts by user
		url: '/',
		templateUrl: '/views/home.html',
		controller: 'MainController'
	})

	.state( 'secured.addNew', { // Page for adding a new debt
		url: '/debt',
		templateUrl: '/views/debt.html',
		controller: 'DebtController'
	})

	.state( 'secured.logout', { // Logging user out
		url: '/logout',
		controller: function( $http, $state ){
			$http.get( '/logout' );
			$state.go( 'login' );
		}
	});
});
