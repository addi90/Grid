// Grid column formatter utility
define([
	"vendor/knockout-3.0.0",
	"vendor/jquery-1.10.2.min"
	],
function(
	ko,
	$){
	"use strict";
	
	/**
	* Mention method description
	* @param: null
	* @returns: view model object for grid
	* <summary> Other details </summary>
	*/
	function viewModel() {

		var self = this;

		//#region Custom bindings
		ko.bindingHandlers.header = {
			update: function(element, valueAccessor, allBindingsAccessor, bindingContext, viewModel){
				var bindingValue = ko.unwrap(valueAccessor());
								
			}
		};
		//#endregion Custom bindings

		//#region Objects
		self.oHeaderConfig= {
				headers: [
					{ label: "column1"},
					{ label: "grouped column1"},
					{ label: "Sub-Column1"},
					{ label: "Sub-Column2"},
					{ label: "Sub-Column3"}
				],
				commonClass: "grid-headers"
			};
		//#endregion Objects
		
		return this;
	};
	
	/// <summary> Instantiate viewModel </summary>
	var vm = new viewModel();
	
	return vm;
	
});