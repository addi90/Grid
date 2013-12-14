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

		// <summary> Assign grid properties and data </summary>
		var table1 = {
			tableCaption: "new table caption",
			isExpanded: ko.observable(true),
			sortColumn: ko.observable('C1'),
			sortOrder: ko.observable('asc'),
			aColModel: [
				{ label: 'Inv No', id: 'C1', spanWidth: 'span2', sortable: true },
				{ label: 'Date', id: 'C2', spanWidth: 'span2', sortable: true },
				{ label: 'Client', id: 'C3', spanWidth: 'span4', sortable: true },
				{ label: 'Amount', id: 'C4', spanWidth: 'span2', sortable: false },
				{ label: 'Tax', id: 'C5', spanWidth: 'span2', sortable: false },
				{ label: 'Total', id: 'C6', spanWidth: 'span2', sortable: true },
				{ label: 'Notes', id: 'C7', spanWidth: 'span6', sortable: false }
			],
			aResponseData: ko.observableArray([
						{
							"C1": 0,
							"C2": "1999-12-02",
							"C3": "Zorromop",
							"C4": "$3,502.00",
							"C5": "$340.00",
							"C6": "$1,338.00",
							"C7": "Culpa anim adipisicing ad et officia eu laborum eu adipisicing consectetur. Velit dolor ut consequat ullamco eu mollit minim ad officia ea elit. Mollit nulla incididunt sunt nostrud. Culpa culpa dolor amet elit dolor.\r\n"
						},
						{
							"C1": 1,
							"C2": "1994-11-06",
							"C3": "Aquafire",
							"C4": "$3,586.00",
							"C5": "$251.00",
							"C6": "$2,984.00",
							"C7": "Enim mollit irure officia ullamco laboris laborum est qui ad sunt irure proident esse. Ex aute est eu qui dolor ipsum labore eu incididunt fugiat. Pariatur sit commodo aute fugiat. Nisi incididunt cupidatat officia nisi ullamco elit Lorem cupidatat nisi culpa labore adipisicing culpa non. Nulla ea laborum eiusmod deserunt in labore. Cillum commodo mollit nisi consectetur quis et sit ut. Lorem est consequat ea quis in id officia ex anim.\r\n"
						},
						{
							"C1": 2,
							"C2": "1991-11-30",
							"C3": "Zinca",
							"C4": "$3,190.00",
							"C5": "$278.00",
							"C6": "$2,726.00",
							"C7": "Lorem aliqua voluptate qui Lorem reprehenderit elit nostrud est sit aliquip nulla ut. Commodo sint aute non deserunt in irure nulla reprehenderit aliquip nostrud esse velit. Lorem nostrud aliqua et ea officia labore et non non in et. Elit cupidatat aute ullamco in qui nulla veniam qui ex.\r\n"
						},
						{
							"C1": 3,
							"C2": "1995-01-10",
							"C3": "Zialactic",
							"C4": "$1,445.00",
							"C5": "$313.00",
							"C6": "$3,040.00",
							"C7": "Dolor labore proident anim sint anim elit irure Lorem Lorem excepteur id. Velit irure fugiat commodo nulla ad irure. Qui aliquip sunt et do minim pariatur pariatur laborum.\r\n"
						},
						{
							"C1": 4,
							"C2": "2003-06-18",
							"C3": "Buzzness",
							"C4": "$2,334.00",
							"C5": "$185.00",
							"C6": "$1,737.00",
							"C7": "Magna laborum quis consequat dolore tempor nostrud. Id consequat commodo mollit excepteur reprehenderit irure eiusmod. Adipisicing aute amet dolore occaecat deserunt duis fugiat ad amet qui. Culpa proident non in aute non adipisicing duis dolore.\r\n"
						},
						{
							"C1": 5,
							"C2": "2002-01-18",
							"C3": "Magneato",
							"C4": "$1,965.00",
							"C5": "$259.00",
							"C6": "$3,816.00",
							"C7": "Nulla eiusmod reprehenderit enim nisi pariatur duis dolor dolor occaecat cupidatat excepteur laboris. Aliqua sunt qui laborum nisi eiusmod minim magna nostrud sit do excepteur irure cillum. Ut sit culpa aute ea laboris excepteur esse dolor laborum aliquip proident quis. Anim ipsum ex reprehenderit nostrud veniam cillum exercitation dolore Lorem. Esse dolore velit anim non deserunt irure do amet reprehenderit enim sint. Adipisicing irure labore exercitation aliquip amet.\r\n"
						},
						{
							"C1": 6,
							"C2": "2013-08-23",
							"C3": "Uniworld",
							"C4": "$2,365.00",
							"C5": "$372.00",
							"C6": "$2,971.00",
							"C7": "Mollit eiusmod pariatur reprehenderit proident incididunt adipisicing in occaecat ea. Ipsum laboris culpa aliquip reprehenderit. Occaecat duis tempor et sunt quis laborum magna aute adipisicing ipsum ad laborum. Aute voluptate elit excepteur laboris culpa consequat Lorem adipisicing. Ex duis enim est quis nulla nostrud reprehenderit aliqua qui. Qui id Lorem do consectetur aliquip reprehenderit Lorem sunt deserunt deserunt adipisicing. Ullamco nisi labore aute ex ipsum.\r\n"
						},
						{
							"C1": 7,
							"C2": "1995-03-09",
							"C3": "Remold",
							"C4": "$1,241.00",
							"C5": "$300.00",
							"C6": "$3,821.00",
							"C7": "Ut cupidatat ex sit consequat occaecat nulla amet. Et non ut eiusmod nostrud fugiat adipisicing aliqua mollit nisi. Anim et fugiat eu duis cupidatat culpa in. Excepteur eu nulla incididunt Lorem ea sunt aute ipsum dolor dolore cupidatat Lorem minim. Eiusmod nostrud commodo ad ut Lorem sit reprehenderit est aute occaecat.\r\n"
						},
						{
							"C1": 8,
							"C2": "1989-10-03",
							"C3": "Diginetic",
							"C4": "$3,856.00",
							"C5": "$211.00",
							"C6": "$2,704.00",
							"C7": "Elit sint quis laborum eiusmod dolor nisi quis laborum amet ea irure. Voluptate est id anim qui duis id voluptate tempor eiusmod amet. Proident ipsum ad laborum aute anim ea ut ad anim officia adipisicing. Culpa in do deserunt nulla excepteur excepteur aliqua qui aute dolore nulla. Exercitation ut fugiat cupidatat ipsum sunt et mollit.\r\n"
						},
						{
							"C1": 9,
							"C2": "2008-06-30",
							"C3": "Zoxy",
							"C4": "$2,699.00",
							"C5": "$349.00",
							"C6": "$3,370.00",
							"C7": "Sunt minim fugiat anim sint ullamco consequat proident cupidatat non ut eiusmod. Velit labore commodo officia sunt cillum officia ut cillum ullamco culpa et nostrud in. Eiusmod commodo adipisicing consectetur ullamco laboris minim veniam aute qui nulla consectetur occaecat dolore.\r\n"
						},
						{
							"C1": 10,
							"C2": "1998-06-21",
							"C3": "Hivedom",
							"C4": "$2,416.00",
							"C5": "$296.00",
							"C6": "$1,561.00",
							"C7": "Qui tempor nostrud magna aliquip laborum non. Minim mollit commodo incididunt et laboris amet adipisicing sunt. Irure laborum consequat adipisicing minim id tempor aliquip laborum commodo irure. Pariatur ut ad sunt occaecat. Cillum ullamco dolore sint occaecat adipisicing dolore culpa elit est mollit elit. Dolor nostrud ipsum non irure proident eiusmod ea qui est aliquip sint id est ut. Aliqua proident sint culpa ut voluptate dolor consectetur consectetur excepteur.\r\n"
						},
						{
							"C1": 11,
							"C2": "1998-06-21",
							"C3": "Hivedom",
							"C4": "$2,416.00",
							"C5": "$296.00",
							"C6": "$1,561.00",
							"C7": "Qui tempor nostrud magna aliquip laborum non. Minim mollit commodo incididunt et laboris amet adipisicing sunt. Irure laborum consequat adipisicing minim id tempor aliquip laborum commodo irure. Pariatur ut ad sunt occaecat. Cillum ullamco dolore sint occaecat adipisicing dolore culpa elit est mollit elit. Dolor nostrud ipsum non irure proident eiusmod ea qui est aliquip sint id est ut. Aliqua proident sint culpa ut voluptate dolor consectetur consectetur excepteur.\r\n"
						},
						{
							"C1": 12,
							"C2": "1998-06-21",
							"C3": "Hivedom",
							"C4": "$2,416.00",
							"C5": "$296.00",
							"C6": "$1,561.00",
							"C7": "Qui tempor nostrud magna aliquip laborum non. Minim mollit commodo incididunt et laboris amet adipisicing sunt. Irure laborum consequat adipisicing minim id tempor aliquip laborum commodo irure. Pariatur ut ad sunt occaecat. Cillum ullamco dolore sint occaecat adipisicing dolore culpa elit est mollit elit. Dolor nostrud ipsum non irure proident eiusmod ea qui est aliquip sint id est ut. Aliqua proident sint culpa ut voluptate dolor consectetur consectetur excepteur.\r\n"
						},
						{
						    "C1": 13,
						    "C2": "2002-01-18",
						    "C3": "Magneato",
						    "C4": "$1,965.00",
						    "C5": "$259.00",
						    "C6": "$3,816.00",
						    "C7": "Nulla eiusmod reprehenderit enim nisi pariatur duis dolor dolor occaecat cupidatat excepteur laboris. Aliqua sunt qui laborum nisi eiusmod minim magna nostrud sit do excepteur irure cillum. Ut sit culpa aute ea laboris excepteur esse dolor laborum aliquip proident quis. Anim ipsum ex reprehenderit nostrud veniam cillum exercitation dolore Lorem. Esse dolore velit anim non deserunt irure do amet reprehenderit enim sint. Adipisicing irure labore exercitation aliquip amet.\r\n"
						},
						{
						    "C1": 14,
						    "C2": "2013-08-23",
						    "C3": "Uniworld",
						    "C4": "$2,365.00",
						    "C5": "$372.00",
						    "C6": "$2,971.00",
						    "C7": "Mollit eiusmod pariatur reprehenderit proident incididunt adipisicing in occaecat ea. Ipsum laboris culpa aliquip reprehenderit. Occaecat duis tempor et sunt quis laborum magna aute adipisicing ipsum ad laborum. Aute voluptate elit excepteur laboris culpa consequat Lorem adipisicing. Ex duis enim est quis nulla nostrud reprehenderit aliqua qui. Qui id Lorem do consectetur aliquip reprehenderit Lorem sunt deserunt deserunt adipisicing. Ullamco nisi labore aute ex ipsum.\r\n"
						},
						{
						    "C1": 15,
						    "C2": "1995-03-09",
						    "C3": "Remold",
						    "C4": "$1,241.00",
						    "C5": "$300.00",
						    "C6": "$3,821.00",
						    "C7": "Ut cupidatat ex sit consequat occaecat nulla amet. Et non ut eiusmod nostrud fugiat adipisicing aliqua mollit nisi. Anim et fugiat eu duis cupidatat culpa in. Excepteur eu nulla incididunt Lorem ea sunt aute ipsum dolor dolore cupidatat Lorem minim. Eiusmod nostrud commodo ad ut Lorem sit reprehenderit est aute occaecat.\r\n"
						},
						{
						    "C1": 16,
						    "C2": "1989-10-03",
						    "C3": "Diginetic",
						    "C4": "$3,856.00",
						    "C5": "$211.00",
						    "C6": "$2,704.00",
						    "C7": "Elit sint quis laborum eiusmod dolor nisi quis laborum amet ea irure. Voluptate est id anim qui duis id voluptate tempor eiusmod amet. Proident ipsum ad laborum aute anim ea ut ad anim officia adipisicing. Culpa in do deserunt nulla excepteur excepteur aliqua qui aute dolore nulla. Exercitation ut fugiat cupidatat ipsum sunt et mollit.\r\n"
						},
						{
						    "C1": 17,
						    "C2": "2008-06-30",
						    "C3": "Zoxy",
						    "C4": "$2,699.00",
						    "C5": "$349.00",
						    "C6": "$3,370.00",
						    "C7": "Sunt minim fugiat anim sint ullamco consequat proident cupidatat non ut eiusmod. Velit labore commodo officia sunt cillum officia ut cillum ullamco culpa et nostrud in. Eiusmod commodo adipisicing consectetur ullamco laboris minim veniam aute qui nulla consectetur occaecat dolore.\r\n"
						},
						{
						    "C1": 18,
						    "C2": "1998-06-21",
						    "C3": "Hivedom",
						    "C4": "$2,416.00",
						    "C5": "$296.00",
						    "C6": "$1,561.00",
						    "C7": "Qui tempor nostrud magna aliquip laborum non. Minim mollit commodo incididunt et laboris amet adipisicing sunt. Irure laborum consequat adipisicing minim id tempor aliquip laborum commodo irure. Pariatur ut ad sunt occaecat. Cillum ullamco dolore sint occaecat adipisicing dolore culpa elit est mollit elit. Dolor nostrud ipsum non irure proident eiusmod ea qui est aliquip sint id est ut. Aliqua proident sint culpa ut voluptate dolor consectetur consectetur excepteur.\r\n"
						},
						{
						    "C1": 19,
						    "C2": "1998-06-21",
						    "C3": "Hivedom",
						    "C4": "$2,416.00",
						    "C5": "$296.00",
						    "C6": "$1,561.00",
						    "C7": "Qui tempor nostrud magna aliquip laborum non. Minim mollit commodo incididunt et laboris amet adipisicing sunt. Irure laborum consequat adipisicing minim id tempor aliquip laborum commodo irure. Pariatur ut ad sunt occaecat. Cillum ullamco dolore sint occaecat adipisicing dolore culpa elit est mollit elit. Dolor nostrud ipsum non irure proident eiusmod ea qui est aliquip sint id est ut. Aliqua proident sint culpa ut voluptate dolor consectetur consectetur excepteur.\r\n"
						},
						{
						    "C1": 20,
						    "C2": "1998-06-21",
						    "C3": "Hivedom",
						    "C4": "$2,416.00",
						    "C5": "$296.00",
						    "C6": "$1,561.00",
						    "C7": "Qui tempor nostrud magna aliquip laborum non. Minim mollit commodo incididunt et laboris amet adipisicing sunt. Irure laborum consequat adipisicing minim id tempor aliquip laborum commodo irure. Pariatur ut ad sunt occaecat. Cillum ullamco dolore sint occaecat adipisicing dolore culpa elit est mollit elit. Dolor nostrud ipsum non irure proident eiusmod ea qui est aliquip sint id est ut. Aliqua proident sint culpa ut voluptate dolor consectetur consectetur excepteur.\r\n"
						},
						{
						    "C1": 21,
						    "C2": "1998-06-21",
						    "C3": "Hivedom",
						    "C4": "$2,416.00",
						    "C5": "$296.00",
						    "C6": "$1,561.00",
						    "C7": "Qui tempor nostrud magna aliquip laborum non. Minim mollit commodo incididunt et laboris amet adipisicing sunt. Irure laborum consequat adipisicing minim id tempor aliquip laborum commodo irure. Pariatur ut ad sunt occaecat. Cillum ullamco dolore sint occaecat adipisicing dolore culpa elit est mollit elit. Dolor nostrud ipsum non irure proident eiusmod ea qui est aliquip sint id est ut. Aliqua proident sint culpa ut voluptate dolor consectetur consectetur excepteur.\r\n"
						},
						{
						    "C1": 22,
						    "C2": "1998-06-21",
						    "C3": "Hivedom",
						    "C4": "$2,416.00",
						    "C5": "$296.00",
						    "C6": "$1,561.00",
						    "C7": "Qui tempor nostrud magna aliquip laborum non. Minim mollit commodo incididunt et laboris amet adipisicing sunt. Irure laborum consequat adipisicing minim id tempor aliquip laborum commodo irure. Pariatur ut ad sunt occaecat. Cillum ullamco dolore sint occaecat adipisicing dolore culpa elit est mollit elit. Dolor nostrud ipsum non irure proident eiusmod ea qui est aliquip sint id est ut. Aliqua proident sint culpa ut voluptate dolor consectetur consectetur excepteur.\r\n"
						},
						{
						    "C1": 23,
						    "C2": "1998-06-21",
						    "C3": "Hivedom",
						    "C4": "$2,416.00",
						    "C5": "$296.00",
						    "C6": "$1,561.00",
						    "C7": "Qui tempor nostrud magna aliquip laborum non. Minim mollit commodo incididunt et laboris amet adipisicing sunt. Irure laborum consequat adipisicing minim id tempor aliquip laborum commodo irure. Pariatur ut ad sunt occaecat. Cillum ullamco dolore sint occaecat adipisicing dolore culpa elit est mollit elit. Dolor nostrud ipsum non irure proident eiusmod ea qui est aliquip sint id est ut. Aliqua proident sint culpa ut voluptate dolor consectetur consectetur excepteur.\r\n"
						},
						{
						    "C1": 24,
						    "C2": "1998-06-21",
						    "C3": "Hivedom",
						    "C4": "$2,416.00",
						    "C5": "$296.00",
						    "C6": "$1,561.00",
						    "C7": "Qui tempor nostrud magna aliquip laborum non. Minim mollit commodo incididunt et laboris amet adipisicing sunt. Irure laborum consequat adipisicing minim id tempor aliquip laborum commodo irure. Pariatur ut ad sunt occaecat. Cillum ullamco dolore sint occaecat adipisicing dolore culpa elit est mollit elit. Dolor nostrud ipsum non irure proident eiusmod ea qui est aliquip sint id est ut. Aliqua proident sint culpa ut voluptate dolor consectetur consectetur excepteur.\r\n"
						}
			]),
			data: ko.observableArray([])
		};

		var pagerConfig1 = [
			{
				 key: 'FirstPage',
				 value: { htmlContent: '&laquo;', title: 'first', value: 1 },
				 format: 'button'
			 },
			{
				key: 'PreviousPage',
				value: { htmlContent: '&lt;', title: 'previous', value: null },
				format: 'button'
			},
			{
				key: 'PageNumbers',
				value: [],
				format: 'button'
			},
			{
				key: 'NextPage',
				value: { htmlContent: '&gt;', title: 'next', value: null },
				format: 'button'
			},
			{
				key: 'LastPage',
				value: { htmlContent: '&raquo;', title: 'last', value: null },
				format: 'button'
			},
			{
				key: 'Text',
				value: 'Page Size',
				format: 'string'
			},
			{
				key: 'PageSizeOptions',
				value: {
					options: [1,2, 5, 10, 20, 30, 50],
					selectedValue: 10
				},
				format: 'dropdown'
			},
			{
				key: 'Text',
				value: 'Showing page',
				format: 'string'
			},
			{
				key: 'CurrentPage',
				value: 1,
				format: 'textbox'
			},
			{
				key: 'Text',
				value: 'of',
				format: 'string'
			},
			{
				key: 'TotalPages',
				value: 30,
				format: 'number'
			},
			{
				key: 'Text',
				value: 'for',
				format: 'string'
			},
			{
				key: 'TotalRecords',
				value: table1.aResponseData().length,
				format: 'number'
			},
			{
				key: 'Text',
				value: 'records',
				format: 'string'
			}
		];

		// <summary> Render grid </summary>
		var tableObj1 = new grid({
			data: table1
		}).render($("#example"));

		// <summary> Render grid pager </summary>
		var pager = new gridPager({
			config: pagerConfig1,
			pagerTemplate: 'basicTemplate'
		});

		var pagerConfig1 = pager.oPagerConfig;

		// Slice grid data based on pager configurations
		var paginatedData = utilities.slicePageData(table1.aResponseData(), pagerConfig1.CurrentPage(), pagerConfig1.PageSize());
		table1.data(paginatedData);

		// <summary> Override event handler </summary>
		var originalOnChange1 = pager.onChange;
		pager.onChange = function () {
			var paginatedData = utilities.slicePageData(table1.aResponseData(), pagerConfig1.CurrentPage(), pagerConfig1.PageSize())
			table1.data(paginatedData);
			originalOnChange1()
		}

		// <summary> Render paginated grid for first time  <summary>
		pager.render($("#pager1"));

		//#endregion

		//#region Table2

		// <summary> Assign grid properties and data </summary>
		var table2 = {
			tableCaption: "new table caption 2",
			isExpanded: ko.observable(true),
			sortColumn: ko.observable('C2'),
			sortOrder: ko.observable('asc'),
			aColModel: [
				{ label: 'Contact Name', id: 'C2', spanWidth: 'span3', sortable: true },
				{ label: 'Contact title', id: 'C3', spanWidth: 'span3', sortable: true },
				{ label: 'Company Name', id: 'C4', spanWidth: 'span3', sortable: false },
				{ label: 'Country', id: 'C5', spanWidth: 'span3', sortable: true },
			],
			aResponseData: ko.observableArray([
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

		// <summary> Render grid </summary>
		var tableObj2 = new grid({
			data: table2
		}).render($("#example2"));

		var pagerConfig = [
			
			{
			    key: 'FirstPage',
			    value: { htmlContent: '&laquo;', title: 'first', value: 1 },
			    format: 'button'
			},
			{
			    key: 'PreviousPage',
			    value: { htmlContent: '&lt;', title: 'previous', value: null },
			    format: 'button'
			},
			{
			    key: 'PageNumbers',
			    value: [],
			    format: 'button'
			},
			{
			    key: 'NextPage',
			    value: { htmlContent: '&gt;', title: 'next', value: null },
			    format: 'button'
			},
			{
			    key: 'LastPage',
			    value: { htmlContent: '&raquo;', title: 'last', value: null },
			    format: 'button'
			},
			{
			    key: 'Text',
			    value: 'Page Size',
			    format: 'string'
			},
			{
			    key: 'PageSizeOptions',
			    value: {
			        options: [1, 2, 5, 10, 20, 30, 50],
			        selectedValue: 10
			    },
			    format: 'dropdown'
			},
			{
			    key: 'Text',
			    value: 'Showing page',
			    format: 'string'
			},
			{
			    key: 'CurrentPage',
			    value: 1,
			    format: 'textbox'
			},
			{
			    key: 'Text',
			    value: 'of',
			    format: 'string'
			},
			{
			    key: 'TotalPages',
			    value: 30,
			    format: 'number'
			},
			{
			    key: 'Text',
			    value: 'for',
			    format: 'string'
			},
			{
			    key: 'TotalRecords',
			    value: table2.aResponseData().length,
			    format: 'number'
			},
			{
			    key: 'Text',
			    value: 'records',
			    format: 'string'
			}
		];

		// <summary> Render grid pager </summary>
		var pager2 = new gridPager({
			config: pagerConfig
		});

		var pagerConfig2 = pager2.oPagerConfig;

		var paginatedData = utilities.slicePageData(table2.aResponseData(), pagerConfig2.CurrentPage(), pagerConfig2.PageSize());
		table2.data(paginatedData);

		// <summary> Override event handler </summary>
		var originalOnChange = pager2.onChange;
		pager2.onChange = function () {
			var paginatedData = utilities.slicePageData(table2.aResponseData(), pagerConfig2.CurrentPage(), pagerConfig2.PageSize())
			table2.data(paginatedData);
			originalOnChange()
		}

		// <summary> Render paginated grid for first time  <summary>
		pager2.render($("#pager2"));

		//#endregion

		//#endregion

		return this;
	};

	// <summary> Instantiate viewModel </summary>
	var vm = new viewModel();

	return vm;
});