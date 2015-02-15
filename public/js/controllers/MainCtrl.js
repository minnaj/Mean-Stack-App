'use strict';

angular.module( 'MainCtrl', ['ui.router'] )


.controller( 'MainController', function( $scope, Debt, $rootScope, $state ){

	Debt.get( function( data, status ){
		$scope.debts = new Array();
		var found = false;

		if( data.length > 0 ){ // Loop through all debts
			data.forEach( function( item ){
				found = false;

				if( $scope.debts.length == 0 ){
					// Copy the first debt
					$scope.debts.push( copyItem( item ));
				}

				else {
					// Check if name is found in the new array
					$scope.debts.forEach( function( newItem ){					
						if( item.name === newItem.name ){
							newItem.amount += item.amount;

							if( item.edited > newItem.edited ){
								newItem.edited = item.edited;
							}

							found = true;
						}
					});

					if( !found ){
						$scope.debts.push( copyItem( item ));
					}
				}
			});


			// Debt amounts (xxxxxx) to decimal format (x,xxx.xx),
			// date to locale format
			$scope.debts.forEach( function( item ){
				var money = '';

				if( item.amount < 0 ){ // Negative values
					money += '-';
					item.amount = Math.abs( item.amount );
				}

				if( item.amount/100000 >= 1 ){ // Thousands
					money += (( item.amount - (item.amount % 100000))/100000 ) + ",";
					item.amount = item.amount % 100000;
				}

				if( item.amount % 100 == 0 ){
					money += item.amount/100;
					money += '.00';
				}

				else if( item.amount % 10 == 0 ){
					money += item.amount/100;
					money += '0';
				}

				else {
					money += item.amount/100;
				}

				item.amount = money;
				var editDate = new Date( item.edited );
				item.edited = editDate.toLocaleDateString() + ", ";
				item.edited += editDate.toLocaleTimeString();
			});
		}
	});



	// Copy 'item' and return it
	function copyItem( item ){
		var debt = {};
		debt.debtID = item.debtID;
		debt.userID = item.userID;
		debt.name = item.name;
		debt.amount = item.amount;
		debt.text = item.text;
		debt.edited = item.edited;
		return debt;
	}

});