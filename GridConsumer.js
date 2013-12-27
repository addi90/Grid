define([
	"vendor/knockout-3.0.0",
	"jquery",
	"vendor/bootstrap",
	"modules/grid",
	"modules/grid.pager",
	"utilities"
],
function (
	ko,
	$,
	bootstrap,
	grid,
	gridPager,
	utilities) {
	"use strict";

	/**
	* Grid consumer
	* @param: null
	* @returns: view model object for grid consumer
	* <summary> Other details </summary>
	*/
	function viewModel() {

		var self = this;

		//#region Create grid

		//#region Table1

		/// <summary> Assign grid properties and data </summary>
		var table1 = {
			caption: "new table caption",
			isExpanded: ko.observable(true),
			sortColumn: ko.observable('C0'),
			sortOrder: ko.observable('asc'),
			columns: [
				{ label: 'Inv No', id: 'C0', spanWidth: 'span2', sortable: true },
				{ label: 'Date', id: 'C1', spanWidth: 'span2', sortable: true },
				{ label: 'Client', id: 'C2', spanWidth: 'span4', sortable: true },
				{ label: 'Amount', id: 'C3', spanWidth: 'span2', sortable: false },
				{ label: 'Tax', id: 'C4', spanWidth: 'span2', sortable: false },
				{ label: 'Total', id: 'C5', spanWidth: 'span2', sortable: true },
				{ label: 'Notes', id: 'C6', spanWidth: 'span6', sortable: false }
			],
			responseData: ko.observableArray([
						{
							"C0": 0,
							"C1": "1999-12-02",
							"C2": "Zorromop",
							"C3": "$3,502.00",
							"C4": "$340.00",
							"C5": "$1,338.00",
							"C6": "Culpa anim adipisicing ad et officia eu laborum eu adipisicing consectetur. Velit dolor ut consequat ullamco eu mollit minim ad officia ea elit. Mollit nulla incididunt sunt nostrud. Culpa culpa dolor amet elit dolor.\r\n"
						},
						{
							"C0": 1,
							"C1": "1999-12-02",
							"C2": "Zorromop",
							"C3": "$3,502.00",
							"C4": "$340.00",
							"C5": "$1,338.00",
							"C6": "Culpa anim adipisicing ad et officia eu laborum eu adipisicing consectetur. Velit dolor ut consequat ullamco eu mollit minim ad officia ea elit. Mollit nulla incididunt sunt nostrud. Culpa culpa dolor amet elit dolor.\r\n"
						},
						{
							"C0": 2,
							"C1": "1999-12-02",
							"C2": "Zorromop",
							"C3": "$3,502.00",
							"C4": "$340.00",
							"C5": "$1,338.00",
							"C6": "Culpa anim adipisicing ad et officia eu laborum eu adipisicing consectetur. Velit dolor ut consequat ullamco eu mollit minim ad officia ea elit. Mollit nulla incididunt sunt nostrud. Culpa culpa dolor amet elit dolor.\r\n"
						},
						{
							"C0": 3,
							"C1": "1999-12-02",
							"C2": "Zorromop",
							"C3": "$3,502.00",
							"C4": "$340.00",
							"C5": "$1,338.00",
							"C6": "Culpa anim adipisicing ad et officia eu laborum eu adipisicing consectetur. Velit dolor ut consequat ullamco eu mollit minim ad officia ea elit. Mollit nulla incididunt sunt nostrud. Culpa culpa dolor amet elit dolor.\r\n"
						},
						{
							"C0": 4,
							"C1": "1999-12-02",
							"C2": "Zorromop",
							"C3": "$3,502.00",
							"C4": "$340.00",
							"C5": "$1,338.00",
							"C6": "Culpa anim adipisicing ad et officia eu laborum eu adipisicing consectetur. Velit dolor ut consequat ullamco eu mollit minim ad officia ea elit. Mollit nulla incididunt sunt nostrud. Culpa culpa dolor amet elit dolor.\r\n"
						},
						{
							"C0": 5,
							"C1": "1999-12-02",
							"C2": "Zorromop",
							"C3": "$3,502.00",
							"C4": "$340.00",
							"C5": "$1,338.00",
							"C6": "Culpa anim adipisicing ad et officia eu laborum eu adipisicing consectetur. Velit dolor ut consequat ullamco eu mollit minim ad officia ea elit. Mollit nulla incididunt sunt nostrud. Culpa culpa dolor amet elit dolor.\r\n"
						},
						{
							"C0": 6,
							"C1": "1999-12-02",
							"C2": "Zorromop",
							"C3": "$3,502.00",
							"C4": "$340.00",
							"C5": "$1,338.00",
							"C6": "Culpa anim adipisicing ad et officia eu laborum eu adipisicing consectetur. Velit dolor ut consequat ullamco eu mollit minim ad officia ea elit. Mollit nulla incididunt sunt nostrud. Culpa culpa dolor amet elit dolor.\r\n"
						}
			]),
			data: ko.observableArray([])
		};
		
		var pagerConfig1 = {
			pageSize: 2,
			pageOptions: [1, 2, 5, 10, 20, 50, 100],
			numberOfLinks: 5,
			currentPage: 1,
			totalRecords: table1.responseData().length,
			template: gridPager.pagerTemplates.basicTemplate,
			overrideConfig: {
				firstPage: {
					value: {

					}
				}
			},
			/// <summary> Override event handler and slice data on change </summary>
			onChange: function (config) {
				// Slice grid data based on initial pager configurations
				var paginatedData1 = utilities.slicePageData(table1.responseData(), config.currentPage, config.pageSize);
				table1.data(paginatedData1);
			}
		}

		/// <summary> Initialize and Render pager for the grid </summary>
		var pager = new gridPager(pagerConfig1).render( $("#pager1"));

	    // Initialise data for first time before rendering grid
		pagerConfig1.onChange({currentPage: 1, pageSize: 2});

		/// <summary> Render grid </summary>
		var tableObj1 = new grid({
			data: table1
		}).render($("#example"));

		//#endregion

		//#region Table3

		/// <summary> Assign grid properties and data </summary>
		var table3 = {
			caption: "Verify configurable column grid",
			sortColumn: ko.observable('C1'),
			sortOrder: ko.observable('asc'),
			columns: [
				'Index',
				{
					label: 'Name', formatter: function () {
						return "<a href='#' data-bind='text: {value}'></a>"
					}
				},
				{
					label: 'Position', formatter: function () {
						return "<button class='btn btn-success' data-bind='text: {value}'></button>"
					}
				},
				'Organization Name',
				'Nationality'
			],
			responseData: ko.observableArray([
				{
					"C0": 0,
					"C1": "Juarez Hudson",
					"C2": "Marketing Manager",
					"C3": "Acium",
					"C4": "Estonia"
				},
				{
					"C0": 1,
					"C1": "Nell Hall",
					"C2": "Operations Manager",
					"C3": "Extro",
					"C4": "San Marino"
				},
				{
					"C0": 2,
					"C1": "Roth Byers",
					"C2": "Order Administrator",
					"C3": "Xurban",
					"C4": "Djibouti"
				},
				{
					"C0": 3,
					"C1": "Garner Stout",
					"C2": "Marketing Manager",
					"C3": "Squish",
					"C4": "Macau"
				},
				{
					"C0": 4,
					"C1": "Cleo Burgess",
					"C2": "Marketing Manager",
					"C3": "Snorus",
					"C4": "Iceland"
				},
				{
					"C0": 5,
					"C1": "Tania Powell",
					"C2": "Marketing Manager",
					"C3": "Bittor",
					"C4": "Libya"
				},
				{
					"C0": 6,
					"C1": "Krystal Murray",
					"C2": "Order Administrator",
					"C3": "Andryx",
					"C4": "Congo"
				},
				{
					"C0": 7,
					"C1": "Freida Hardy",
					"C2": "Order Administrator",
					"C3": "Zilphur",
					"C4": "Trinidad &amp; Tobago"
				},
				{
					"C0": 8,
					"C1": "Lyons Gilmore",
					"C2": "Owner",
					"C3": "Menbrain",
					"C4": "India"
				},
				{
					"C0": 9,
					"C1": "Pamela Mooney",
					"C2": "Order Administrator",
					"C3": "Moreganic",
					"C4": "Sudan"
				},
				{
					"C0": 10,
					"C1": "Gonzalez Baxter",
					"C2": "Order Administrator",
					"C3": "Acrodance",
					"C4": "Honduras"
				},
				{
					"C0": 11,
					"C1": "Quinn Shaw",
					"C2": "Owner",
					"C3": "Gushkool",
					"C4": "Cameroon"
				},
				{
					"C0": 12,
					"C1": "Lilia Conrad",
					"C2": "Order Administrator",
					"C3": "Deminimum",
					"C4": "Greece"
				},
				{
					"C0": 13,
					"C1": "Pam Bowman",
					"C2": "Order Administrator",
					"C3": "Songbird",
					"C4": "Zimbabwe"
				},
				{
					"C0": 14,
					"C1": "Monroe Massey",
					"C2": "Operations Manager",
					"C3": "Billmed",
					"C4": "Guernsey"
				},
				{
					"C0": 15,
					"C1": "Essie Hester",
					"C2": "Order Administrator",
					"C3": "Xinware",
					"C4": "Anguilla"
				},
				{
					"C0": 16,
					"C1": "Carlson Adkins",
					"C2": "Operations Manager",
					"C3": "Zipak",
					"C4": "Palestine"
				},
				{
					"C0": 17,
					"C1": "Bradford Stevenson",
					"C2": "Operations Manager",
					"C3": "Silodyne",
					"C4": "Mali"
				},
				{
					"C0": 18,
					"C1": "Francesca Porter",
					"C2": "Owner",
					"C3": "Savvy",
					"C4": "Mongolia"
				},
				{
					"C0": 19,
					"C1": "Haley Gonzalez",
					"C2": "Order Administrator",
					"C3": "Zillacon",
					"C4": "Rwanda"
				},
				{
					"C0": 20,
					"C1": "Deidre Montoya",
					"C2": "Operations Manager",
					"C3": "Isoswitch",
					"C4": "Russia"
				},
				{
					"C0": 21,
					"C1": "Leanne Osborn",
					"C2": "Operations Manager",
					"C3": "Ramjob",
					"C4": "Croatia"
				},
				{
					"C0": 22,
					"C1": "Stanley Barron",
					"C2": "Order Administrator",
					"C3": "Fuelton",
					"C4": "Ukraine"
				},
				{
					"C0": 23,
					"C1": "Aurelia Acevedo",
					"C2": "Order Administrator",
					"C3": "Eargo",
					"C4": "France"
				}
			]),
			data: ko.observableArray([])
		}

		var pagerConfig3 = {
			pageSize: 2,
			pageOptions: [1, 2, 5, 10, 20, 50, 100],
			numberOfLinks: 10,
			currentPage: 1,
			totalRecords: table3.responseData().length,
			template: gridPager.pagerTemplates.basicTemplate,
			overrideConfig: {
				firstPage: {
					value: {

					}
				}
			},
			/// <summary> Override event handler and slice data on change </summary>
			onChange: function (config) {
				// Slice grid data based on initial pager configurations
				var paginatedData = utilities.slicePageData(table3.responseData(), config.currentPage, config.pageSize);
				table3.data(paginatedData);
			}
		}

		/// <summary> Initialize Render pager for the grid </summary>
		var pager3 = new gridPager(pagerConfig3).render($("#pager3"));

	    // Initialise data for first time
		pagerConfig3.onChange({ currentPage: 1, pageSize: 2 });

	    /// <summary> Render grid </summary>
		var tableObj3 = new grid({
		    data: table3
		}).render($("#example3"));

		//#endregion

		//#endregion

		return this;
	};

	/// <summary> Instantiate viewModel </summary>
	return new viewModel();
});