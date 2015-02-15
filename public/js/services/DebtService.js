'use strict';

angular.module( 'DebtService', [] ).factory( 'Debt', function( $http ){

	return {
		get : function( callback ){
			$http.get( '/api/debts' )
			.success( function( data, status ){
				callback( data, status );
			});
		},

		create : function( debtData ){
			$http.post( '/api/debts', debtData );
		},

		delete : function( id ){
			$http.delete( '/api/debts/' + id );
		}
	}
});