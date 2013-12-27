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
				"{tableExpandableHeader}" +
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

		//#endregion

		//// TODO: Update logic/ template for table HTML
		// Assign initial template
		grid.tableHtml = tableHtml;

		/// <summary> Hash for Html templates for grid components </summary>
		var templateHtml = {
			'Header': "<h2 data-bind='text: caption'></h2>",
			'ExpandableHeader': "<h2 class='expanded cursorPointer' data-bind='text: caption, " +
															   "click: $parent.toggleExpandCollapseContainer.bind($data, isExpanded), " +
															   "expandCollapse: isExpanded'> " +
								"</h2>",
			'Cell': "<td data-bind='text: $parent[id]'></td>",
			'FormattedCell': "<td data-bind='formatCell: $parent[id], cellClass: &apos;btn&apos;'></td>"
		};

		/// <summary> Check for isExpanded property </summary>
		var _getTableHtml = function (config) {

			// Check if 'isExpanded' property exists for table
			// else add 'isExpanded' and default to 'true'
			if (!config.hasOwnProperty('isExpanded')) {
				config['isExpanded'] = true;
				grid.tableHtml = tableHtml.replace('{tableExpandableHeader}', templateHtml['Header']);
			} else {
				grid.tableHtml = tableHtml.replace('{tableExpandableHeader}', templateHtml['ExpandableHeader']);
			}
		};

		/// <summary> Get formatted cells </summary>
		var _getFormattedCellHtml = function (column) {
			// Format the data array for the input column
			ko.utils.arrayForEach(grid.tableObject, function (currentRow) {
				currentRow[column]['isclickable'] = true;
			})
		};

		/// <summary> Generate  html for columns </summary>
		var _getColumnHtml = function (columns) {

			if (!!columns && columns.length > 0) {
				var noOfColumns = columns.length;

				/// Iterate through columns array
				for (var index = 0; index < noOfColumns; index++) {

					// Check if 'label' property exist for every column in user configuration 
					// else add 'label' for the data on column index
					if (!columns[index].hasOwnProperty('label')) {
						var columnLabel = columns[index];

						// Create an object with 'label' property and value at 'columns[index]'
						columns[index] = {};
						columns[index]['label'] = columnLabel;
					}

					var column = columns[index];

					// Check if 'id' property exist for every column in user configuration 
					// else add 'id' based on column index
					if (!column.hasOwnProperty('id')) {
						column['id'] = 'C' + index;
					}

					// Check if 'allowHTML' property exist for column in user configuration 
					// And call the handler for the same to get cell values
					if (column.hasOwnProperty('allowHTML')) {
						// Get formatted data for current column
						_getFormattedCellHtml(column.id);
					}

					// Check if 'spanwidth' property exist for every column in user configuration 
					// else add 'spanwidth' based on no of columns 
					if (!column.hasOwnProperty('spanWidth')) {
						column['spanWidth'] = 'span' + Math.ceil((12 / noOfColumns), 10);
					}

					// Check if 'sortable' property exists for every column in user configuration
					// else add ''sortable' to all columns and default to 'false'
					if (!column.hasOwnProperty('sortable')) {
						column['sortable'] = true;
					}
				};
			}
		}

		//// TODO: Use this to update more configuration on grid components
		/// <summary> Hash to map Function and Placeholder used to generate HTML </summary>
		var _placeHolder = {
			'columns': _getColumnHtml
		};

		//#endregion

		// Create customized templates if configuration not provided by user
		_getTableHtml(grid.tableObject);
		_getColumnHtml(grid.tableObject.columns);

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