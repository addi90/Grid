// Grid view model
// Refer: http://yuilibrary.com/yui/docs/datatable/
define([
	"vendor/knockout-3.0.0",
	"jquery"
],
function (
	ko,
	$) {
	"use strict";

	//#region Grid initial data structure
	var initTableData = {
		caption: 'Single level grid',
		isExpanded: true,
		columns: [],
		responseData: [],
		data: []
	};

	var tableHtml =
			"<section data-bind='with: tableObject'>" +
				"<div class='table-responsive' data-bind='visible: isExpanded'>" +
					"<table class='table table-striped table-hover'>" +
						"<thead>" +
							"<tr class='row'>" +
							"<!-- ko foreach: columns-->" +
								"<!-- ko ifnot: sortable-->" +
								"<th data-bind='textAndTitle: label, " +
										"class : { className: spanWidth }'>" +
								"</th>" +
								"<!-- /ko -->" +
								"<!-- ko if: sortable-->" +
								"<th data-bind='class : { className: spanWidth, isCursorPointer: sortable }'> " +
									"<a href='#' data-bind='textAndTitle: label, " +
										"updateSortIcons: { columnName: id, sortColumnName: $parent.sortColumn, sortOrder: $parent.sortOrder }," +
										"click: $root.sort.bind($data, $parent)'>" +
									"</a>" +
								"</th>" +
								"<!-- /ko -->" +
							"<!-- /ko -->" +
							"</tr>" +
						"</thead>" +
						"<tbody data-bind='foreach: data'>" +
							"<tr class='row' data-bind='foreach: $parent.columns'>" +
							    "<td data-bind='text: $parent[id]'></td>" +
							"</tr>" +
						"</tbody>" +
						"<div class='clearfix'></div>" +
					"</table>" +
				"</div>" +
			"</section>";


	//#endregion

	/**
	* Mention method description
	* @param: null
	* @returns: view model object for grid
	* <summary> Other details </summary>
	*/
	function Grid(tableConfig) {

		var grid = this;

		//#region Custom Html generator

	    //#region Grid objects

		grid.tableObject = !!tableConfig.data ? tableConfig.data : initTableData;
		grid.tableHtml = tableHtml;
	    //#endregion

		//#region Functions

		/// <summary> Update sort column on click </summary> 
		grid.sort = function (tableObject, column) {

			//Check if sortable column
			if (column.sortable) {
				// If sort column is same then toggle sort order
				if (tableObject.sortColumn() === column.id) {
					// Toggle sort classes
					if (tableObject.sortOrder() === 'asc') {
						tableObject.data.sortByColumn(column.id, 'desc');
						tableObject.sortOrder('desc');
					} else {
						tableObject.data.sortByColumn(column.id, 'asc');
						tableObject.sortOrder('asc');
					}
				} else {
					tableObject.data.sortByColumn(column.id, 'asc');
					tableObject.sortOrder('asc');
				}

				//<summary> Sort the data per current sort column </summary>
				tableObject.sortColumn(column.id);
			}
		}

		//<summary> Toggle expand/ collapse for container </summary> 
		grid.toggleExpandCollapseContainer = function (value) {
			// toggle value of show/ hide for container
			value(!value());
		};

		//#endregion

		return this;
	};

	//#region Create grid prototype

	// <summary Render grid based on input parameter </summary
	Grid.prototype.render = function (elementSelector) {

		elementSelector[0].innerHTML += this.tableHtml;
		ko.applyBindings(this, elementSelector[0]);
	}

	//#endregion

	return Grid;
});