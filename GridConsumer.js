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

		var pagerConfig1 = [
			{
				key: 'FirstPage',
				value: { htmlContent: '&laquo;', title: 'first', value: 1 }
			},
			{
				key: 'PreviousPage',
				value: { htmlContent: '&lt;', title: 'previous', value: null }
			},
			{
				key: 'PageNumbers',
				value: []
			},
			{
				key: 'NextPage',
				value: { htmlContent: '&gt;', title: 'next', value: null }
			},
			{
				key: 'LastPage',
				value: { htmlContent: '&raquo;', title: 'last', value: null }
			},
			{
				key: 'Text',
				value: 'Page Size'
			},
			{
				key: 'PageSizeOptions',
				value: {
					options: [1, 2, 5, 10, 20, 30, 50],
					selectedValue: 10
				}
			},
			{
				key: 'Text',
				value: 'Showing page'
			},
			{
				key: 'CurrentPage',
				value: 1
			},
			{
				key: 'Text',
				value: 'of'
			},
			{
				key: 'TotalPages',
				value: 0
			},
			{
				key: 'Text',
				value: 'for'
			},
			{
				key: 'TotalRecords',
				value: table1.responseData().length
			},
			{
				key: 'Text',
				value: 'records'
			}
		];

		/// <summary> Render grid </summary>
		var tableObj1 = new grid({
			data: table1
		}).render($("#example"));

		/// <summary> Call grid pager constructor </summary>
		var pager = new gridPager({
			config: pagerConfig1,
			pagerTemplate: 'basicTemplate'
		});

		var oPagerConfig1 = pager.oPagerConfig;

		// Slice grid data based on initial pager configurations
		var paginatedData1 = utilities.slicePageData(table1.responseData(), oPagerConfig1.CurrentPage(), oPagerConfig1.PageSize());
		table1.data(paginatedData1);

		/// <summary> Override event handler and slice data on change </summary>
		var originalOnChange1 = pager.onChange;
		pager.onChange = function () {
			var paginatedData2 = utilities.slicePageData(table1.responseData(), oPagerConfig1.CurrentPage(), oPagerConfig1.PageSize())
			table1.data(paginatedData2);
			originalOnChange1()
		}

		/// <summary> Render pager for the grid  <summary>
		pager.render($("#pager1"));

		//#endregion

		//#region Table2

		/// <summary> Assign grid properties and data </summary>
		var table2 = {
			caption: "new table caption 2",
			isExpanded: ko.observable(true),
			sortColumn: ko.observable('C2'),
			sortOrder: ko.observable('asc'),
			columns: [
				{ label: 'Contact Name', id: 'C2', spanWidth: 'span3', sortable: true },
				{ label: 'Contact title', id: 'C3', spanWidth: 'span3', sortable: true },
				{ label: 'Company Name', id: 'C4', spanWidth: 'span3', sortable: false },
				{ label: 'Country', id: 'C5', spanWidth: 'span3', sortable: true },
			],
			responseData: ko.observableArray([
					{
						"C1": 0,
						"C2": "Carissa Lancaster",
						"C3": "Owner",
						"C4": "Infotrips",
						"C5": "Nigeria"
					},
					{
						"C1": 1,
						"C2": "Potts Riley",
						"C3": "Owner",
						"C4": "Comdom",
						"C5": "Thailand"
					},
					{
						"C1": 2,
						"C2": "Lora Dillon",
						"C3": "Marketing Manager",
						"C4": "Blanet",
						"C5": "Grenada"
					},
					{
						"C1": 3,
						"C2": "Munoz Mcclure",
						"C3": "Operations Manager",
						"C4": "Sultraxin",
						"C5": "Lithuania"
					},
					{
						"C1": 4,
						"C2": "Barron Odom",
						"C3": "Marketing Manager",
						"C4": "Qualitex",
						"C5": "Montserrat"
					},
					{
						"C1": 5,
						"C2": "Jessie Christian",
						"C3": "Operations Manager",
						"C4": "Trollery",
						"C5": "Palestine"
					},
					{
						"C1": 6,
						"C2": "Rachelle Morton",
						"C3": "Marketing Manager",
						"C4": "Medcom",
						"C5": "Antigua &amp; Barbuda"
					},
					{
						"C1": 7,
						"C2": "Shannon Boyd",
						"C3": "Order Administrator",
						"C4": "Cowtown",
						"C5": "Mongolia"
					},
					{
						"C1": 8,
						"C2": "Juarez Parsons",
						"C3": "Order Administrator",
						"C4": "Viasia",
						"C5": "Israel"
					},
					{
						"C1": 9,
						"C2": "Kelley Dickson",
						"C3": "Operations Manager",
						"C4": "Corpulse",
						"C5": "Namibia"
					},
					{
						"C1": 10,
						"C2": "Clarke Cotton",
						"C3": "Marketing Manager",
						"C4": "Marvane",
						"C5": "Qatar"
					},
					{
						"C1": 11,
						"C2": "Combs Gilmore",
						"C3": "Owner",
						"C4": "Macronaut",
						"C5": "Syria"
					},
					{
						"C1": 12,
						"C2": "Conley Carpenter",
						"C3": "Operations Manager",
						"C4": "Kindaloo",
						"C5": "China"
					},
					{
						"C1": 13,
						"C2": "May Matthews",
						"C3": "Operations Manager",
						"C4": "Geekfarm",
						"C5": "Malta"
					},
					{
						"C1": 14,
						"C2": "Dickson Harding",
						"C3": "Owner",
						"C4": "Sportan",
						"C5": "Timor L'Este"
					},
					{
						"C1": 15,
						"C2": "Good Stevens",
						"C3": "Owner",
						"C4": "Plutorque",
						"C5": "British Virgin Islands"
					},
					{
						"C1": 16,
						"C2": "Kirby Rosales",
						"C3": "Operations Manager",
						"C4": "Sentia",
						"C5": "Costa Rica"
					},
					{
						"C1": 17,
						"C2": "Valencia Bradley",
						"C3": "Marketing Manager",
						"C4": "Supremia",
						"C5": "Spain"
					},
					{
						"C1": 18,
						"C2": "Coleen Irwin",
						"C3": "Marketing Manager",
						"C4": "Navir",
						"C5": "Oman"
					},
					{
						"C1": 19,
						"C2": "Jenifer Carson",
						"C3": "Order Administrator",
						"C4": "Comtent",
						"C5": "Kenya"
					},
					{
						"C1": 20,
						"C2": "Strickland Peck",
						"C3": "Marketing Manager",
						"C4": "Pyramia",
						"C5": "New Caledonia"
					},
					{
						"C1": 21,
						"C2": "Foley Roth",
						"C3": "Owner",
						"C4": "Zilladyne",
						"C5": "Dominica"
					},
					{
						"C1": 22,
						"C2": "Bright Kelly",
						"C3": "Order Administrator",
						"C4": "Isologica",
						"C5": "Laos"
					},
					{
						"C1": 23,
						"C2": "Cotton Prince",
						"C3": "Operations Manager",
						"C4": "Bostonic",
						"C5": "Algeria"
					},
					{
						"C1": 24,
						"C2": "Faye Walsh",
						"C3": "Operations Manager",
						"C4": "Gorganic",
						"C5": "Andorra"
					},
					{
						"C1": 25,
						"C2": "Joyce Pacheco",
						"C3": "Operations Manager",
						"C4": "Quarex",
						"C5": "Russia"
					},
					{
						"C1": 26,
						"C2": "Webb Guy",
						"C3": "Owner",
						"C4": "Zaggles",
						"C5": "Estonia"
					},
					{
						"C1": 27,
						"C2": "Nellie Higgins",
						"C3": "Operations Manager",
						"C4": "Applidec",
						"C5": "Greenland"
					},
					{
						"C1": 28,
						"C2": "Kristen Bright",
						"C3": "Owner",
						"C4": "Securia",
						"C5": "Barbados"
					},
					{
						"C1": 29,
						"C2": "Mai Roberts",
						"C3": "Operations Manager",
						"C4": "Isologix",
						"C5": "Tajikistan"
					},
					{
						"C1": 30,
						"C2": "Deborah Steele",
						"C3": "Marketing Manager",
						"C4": "Enervate",
						"C5": "Virgin Islands (US)"
					},
					{
						"C1": 31,
						"C2": "Deborah Steele",
						"C3": "Marketing Manager",
						"C4": "Enervate",
						"C5": "Virgin Islands (US)"
					}
			]),
			data: ko.observableArray([])
		}

		/// <summary> Render grid </summary>
		var tableObj2 = new grid({
			data: table2
		}).render($("#example2"));

		var pagerConfig2 = [
			{
				key: 'FirstPage',
				value: { htmlContent: '&laquo;', title: 'first', value: 1 }
			},
			{
				key: 'PreviousPage',
				value: { htmlContent: '&lt;', title: 'previous', value: null }
			},
			{
				key: 'PageNumbers',
				value: []
			},
			{
				key: 'NextPage',
				value: { htmlContent: '&gt;', title: 'next', value: null }
			},
			{
				key: 'LastPage',
				value: { htmlContent: '&raquo;', title: 'last', value: null }
			},
			{
				key: 'Text',
				value: 'Page Size'
			},
			{
				key: 'PageSizeOptions',
				value: {
					options: [1, 2, 5, 10, 20, 30, 50],
					selectedValue: 10
				}
			},
			{
				key: 'Text',
				value: 'Showing page'
			},
			{
				key: 'CurrentPage',
				value: 1
			},
			{
				key: 'Text',
				value: 'of'
			},
			{
				key: 'TotalPages',
				value: 0
			},
			{
				key: 'Text',
				value: 'for'
			},
			{
				key: 'TotalRecords',
				value: table2.responseData().length
			},
			{
				key: 'Text',
				value: 'records'
			}
		];

		/// <summary> Call grid pager constructor </summary>
		var pager2 = new gridPager({
			config: pagerConfig2
		});

		var oPagerConfig2 = pager2.oPagerConfig;

		// Slice grid data based on initial pager configurations
		var paginatedData3 = utilities.slicePageData(table2.responseData(), oPagerConfig2.CurrentPage(), oPagerConfig2.PageSize());
		table2.data(paginatedData3);

		/// <summary> Override event handler and slice data on change </summary>
		var originalOnChange2 = pager2.onChange;
		pager2.onChange = function () {
			var paginatedData4 = utilities.slicePageData(table2.responseData(), oPagerConfig2.CurrentPage(), oPagerConfig2.PageSize())
			table2.data(paginatedData4);
			originalOnChange2()
		}

		/// <summary> Render pager for the grid  <summary>
		pager2.render($("#pager2"));

		//#endregion

		//#region Table3

		/// <summary> Assign grid properties and data </summary>
		var table3 = {
			caption: "Verify configurable column grid",
			sortColumn: ko.observable('C0'),
			sortOrder: ko.observable('asc'),
			columns: [
				'Index',
				{ label: 'Name', allowHTML: true, formatter: '<a href="#{value}" data-bind>{value}</a>' },
				'Position',
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

		/// <summary> Render grid </summary>
		var tableObj3 = new grid({
			data: table3
		}).render($("#example3"));

		var pagerConfig3 = [
			{
				key: 'FirstPage',
				value: { htmlContent: '&laquo;', title: 'first', value: 1 }
			},
			{
				key: 'PreviousPage',
				value: { htmlContent: '&lt;', title: 'previous', value: null }
			},
			{
				key: 'PageNumbers',
				value: []
			},
			{
				key: 'NextPage',
				value: { htmlContent: '&gt;', title: 'next', value: null }
			},
			{
				key: 'LastPage',
				value: { htmlContent: '&raquo;', title: 'last', value: null }
			},
			{
				key: 'Text',
				value: 'Page Size'
			},
			{
				key: 'PageSizeOptions',
				value: {
					options: [1, 2, 5, 10, 20, 30, 50],
					selectedValue: 10
				}
			},
			{
				key: 'Text',
				value: 'Showing page'
			},
			{
				key: 'CurrentPage',
				value: 1
			},
			{
				key: 'Text',
				value: 'of'
			},
			{
				key: 'TotalPages',
				value: 0
			},
			{
				key: 'Text',
				value: 'for'
			},
			{
				key: 'TotalRecords',
				value: table3.responseData().length
			},
			{
				key: 'Text',
				value: 'records'
			}
		];

		/// <summary> Call grid pager constructor </summary>
		var pager3 = new gridPager({
			config: pagerConfig3
		});

		var oPagerConfig3 = pager3.oPagerConfig;

		// Slice grid data based on initial pager configurations
		var paginatedData5 = utilities.slicePageData(table3.responseData(), oPagerConfig3.CurrentPage(), oPagerConfig3.PageSize());
		table3.data(paginatedData5);

		/// <summary> Override event handler and slice data on change </summary>
		var originalOnChange3 = pager3.onChange;
		pager3.onChange = function () {
			var paginatedData6 = utilities.slicePageData(table3.responseData(), oPagerConfig3.CurrentPage(), oPagerConfig3.PageSize())
			table3.data(paginatedData6);
			originalOnChange3()
		}

		/// <summary> Render pager for the grid  <summary>
		pager3.render($("#pager3"));

		//#endregion

		//#endregion

		return this;
	};

	/// <summary> Instantiate viewModel </summary>
	return new viewModel();
});