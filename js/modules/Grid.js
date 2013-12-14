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
		tableCaption: 'Single level grid',
		isExpanded: true,
		aColModel: [],
		aResponseData: [],
		data: []
	};

	var tableHtml =
			"<section data-bind='with: tableObject'>" +
				"<h2 class='expanded cursorPointer' data-bind='text: tableCaption, click: $parent.toggleExpandCollapseContainer.bind($data, isExpanded), expandCollapse: isExpanded'></h2>" +
				"<div class='table-responsive' data-bind='visible: isExpanded'>" +
					"<table class='table table-striped table-hover'>" +
						"<thead>" +
							"<tr class='row'>" +
							"<!-- ko foreach: aColModel -->" +
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
							"<tr class='row' data-bind='foreach: $parent.aColModel'>" +
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

	function Grid(configOptions) {

		var grid = this;

		//#region Grid objects

		grid.tableObject = !!configOptions.data ? configOptions.data : initTableData;
		grid.tableHtml = tableHtml;


		//#endregion

		//#region Functions

		// <summary> Update sort column on click </summary> 
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

		// <summary> Create table using basic jquery </summary>
		grid.generateTable = function (tableConfiguration) {

			var tableHeader = tableConfiguration.header;
			var tableContent = tableConfiguration.content;
			var tableParentContainer = tableConfiguration.parentContainer;

			// creates a <table> element 
			var tbl = $('<table></table>').appendTo(tableParentContainer);

			//#region Create Table header

			var tblHead = $('<thead></thead>');
			var columnHeaderRow = $('<tr></tr>');

			for (var index = 0; index < tableHeader.length; index++) {
				// create td for each column and bind the text
				var currentColumn = tableHeader[index];

				var columnHeaderCell = $('<th></th>').
											text(currentColumn.label)
											.attr({ 'id': currentColumn.id, 'class': currentColumn.spanWidth })
											.css({ 'cursorPointer': currentColumn.sortable });

				columnHeaderCell.appendTo(columnHeaderRow);
			}

			//Append row to header
			columnHeaderRow.appendTo(tblHead);

			//#endregion

			//#region Create Table body

			var tblBody = $('<tbody></tbody>');

			for (var rowIndex = 0; rowIndex < tableContent.length; rowIndex++) {
				var currentDataRow = tableContent[rowIndex];

				// create a data row
				var dataRow = $('<tr></tr>');

				// create cell content for the row and append to row
				for (var cell in currentDataRow) {
					var cellData = $('<td></td>').text(currentDataRow[cell]);

					cellData.appendTo(dataRow);
				}

				// add the row to the end of the table body
				dataRow.appendTo(tblBody);
			}

			//#endregion

			// Append header to table
			tblHead.appendTo(tbl);

			// Append body to table
			tblBody.appendTo(tbl);
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