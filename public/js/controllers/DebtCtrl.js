'use strict';

angular.module( 'DebtCtrl', ['ui.router'] )


.controller( 'DebtController', function( $scope, $state, Debt ){
	
	$scope.newDebt = function(){
		if( $scope.debtForm.$valid ){
			var money = $scope.debtAmount*100; // Change to integer
			Debt.create({
				name: $scope.debtName, 
				amount: money, 
				description: $scope.debtDescription });
			$state.go( 'secured.home' );

		}
	}
});