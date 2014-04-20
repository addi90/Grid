//https://github.com/remcoros/ko.pager/wiki
// Grid pagination util
define([
	"vendor/knockout-3.0.0",
	"vendor/jquery-1.10.2.min",
	"utilities",
	"KnockoutUtilities"
],
function (
	ko,
	$,
	utilities,
	KnockoutUtilities) {
	"use strict";

	//#region Default Pager configuration
	var oDefaultPagerConfig = [
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
					options: [10, 20, 30, 50],
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
				value: 0,
				format: 'number'
			},
			{
				key: 'Text',
				value: 'for',
				format: 'string'
			},
			{
				key: 'TotalRecords',
				value: 0,
				format: 'number'
			},
			{
				key: 'Text',
				value: 'records',
				format: 'string'
			}
	];
	//#endregion

	/**
	* Mention method description
	* @param: null
	* @returns: view model object for grid
	* <summary> Other details </summary>
	*/
	function GridPager(configOptions) {

		var gridPager = this;

		//#region Generate custom template based html

		// Page object for number links
		var pageObjectNumbers = function (oCurrentPage) {
			this.htmlContent = oCurrentPage + 1;
			this.title = oCurrentPage + 1;
			this.value = oCurrentPage + 1;
		};

		// Page object
		var pageObject = function (currentPageObject) {
			this.htmlContent = currentPageObject.htmlContent;
			this.title = currentPageObject.title;
			this.value = currentPageObject.value;
		};

		// Define set of configurations
		gridPager.oPagerConfig = {
			CurrentPage: ko.observable(1).extend({ logChange: 'updatedValue' }),
			PageOptions: [],
			TotalRecords: ko.observable(50).extend({ logChange: 'updateValue' }),
			PageSize: ko.observable(10).extend({ logChange: 'updateValue' }),
			NumberOfLinks: ko.observable(10),
			FirstPage: new pageObject({
				htmlContent: '&laquo;',
				title: 'first page',
				value: 1
			}),
			CurrentPages: ko.observableArray()
		};

		// Find total pages
		gridPager.oPagerConfig.TotalPages = ko.computed(function () {
			return Math.ceil(gridPager.oPagerConfig.TotalRecords() / gridPager.oPagerConfig.PageSize());
		});

		// Last page
		gridPager.oPagerConfig.LastPage = ko.computed(function () {
			var totalNoOfPages = gridPager.oPagerConfig.TotalPages();

			if (!!!totalNoOfPages) {
				totalNoOfPages = 0
			} else {
				totalNoOfPages = totalNoOfPages;
			}

			return new pageObject({
				htmlContent: '&raquo;',
				title: 'last page',
				value: totalNoOfPages
			})
		});

		// Next page
		gridPager.oPagerConfig.NextPage = ko.computed(function () {
			var currentPage = gridPager.oPagerConfig.CurrentPage();

			if (!!currentPage) {
				if (currentPage === gridPager.oPagerConfig.TotalPages()) {
					return new pageObject({
						htmlContent: '&gt;',
						title: 'next',
						value: currentPage
					})
				} else {
					return new pageObject({
						htmlContent: '&gt;',
						title: 'next',
						value: currentPage + 1
					})
				}
			}
		});

		// Prev page
		gridPager.oPagerConfig.PrevPage = ko.computed(function () {
			var currentPage = gridPager.oPagerConfig.CurrentPage();

			if (!!currentPage) {
				if (currentPage === 1) {
					return new pageObject({
						htmlContent: '&lt;',
						title: 'previous',
						value: currentPage
					})
				} else {
					return new pageObject({
						htmlContent: '&lt;',
						title: 'previous',
						value: currentPage - 1
					})
				}
			}
		});

		// Current page object
		gridPager.oPagerConfig.CurrentPageObject = ko.computed(function () {
			var currentPage = parseInt(gridPager.oPagerConfig.CurrentPage());
			return new pageObject({
				htmlContent: currentPage,
				title: currentPage,
				value: currentPage
			});
		});

		// Create all links for pages
		gridPager.oPagerConfig.PageNumbers = ko.computed(function () {
			// Create observable array of size of total pages
			// and generate dynamic pages based on total pages
			var linksSimpleArray = [];
			for (var index = 0; index < gridPager.oPagerConfig.TotalPages() ; index++) {
				var a = new pageObjectNumbers(index);
				linksSimpleArray.push(a);
			}

			return linksSimpleArray;
		});

		// <summary> get current page value </summary>
		gridPager.getCurrentPage = function () {
			var currentPage = gridPager.oPagerConfig.CurrentPage();
			if (utilities.isNumber(currentPage)) {
				var currentNumber = parseInt(currentPage, 10);
				return (!isNaN(currentNumber) ? currentNumber : 1);
			}
			return null;
		};

		// <summary Generate  html for current shown content </summary
		gridPager.oPagerConfig.CurrentPages = ko.computed(function () {

			var startPageIndex = 0
				, endPageIndex = 0
				, maxPageIndex = 0
				, config = gridPager.oPagerConfig
				, allPages = !!config.PageNumbers() ? config.PageNumbers() : []
				, pageOffset = parseInt(gridPager.getCurrentPage() % config.NumberOfLinks(), 10)
				, indexExtra = 1;

			if (pageOffset === 0) {
				pageOffset = config.NumberOfLinks();
			}

			// Assign start and end pages
			startPageIndex = gridPager.getCurrentPage() - pageOffset + indexExtra,
			endPageIndex = startPageIndex + config.NumberOfLinks() - 1;

			// Case 1: If start page is Page 1
			if (!!config.FirstPage && config.FirstPage.value === 1) {
				// Case a: if max page number is more than Number of links to be shown (...)
				if (allPages && allPages.length > config.NumberOfLinks()) {
					var currentPages = allPages.slice(0, config.NumberOfLinks());
					return currentPages;
				}
					// Case b: if max page number is less than Number of links to be shown
				else {
					var currentPages = allPages.slice(0, config.PageNumbers().length);
					return currentPages;
				}
			}

			// Case 2: If start page is more than end page index (...)

			// default case
		});

		gridPager.setCurrentPage = function (oPage) {
			if (utilities.isNumber(parseInt(oPage.value, 10))) {
				gridPager.oPagerConfig.CurrentPage(oPage.value);
			} else {
				throw 'Page number ' + oPage.value + ' is not number';
			}
		};

		// Disable links 
		gridPager.oDisabledLinks = {
			FirstAndPrev: ko.computed(function () {
				// Get current page number
				var currentPageNumber = gridPager.getCurrentPage();
				if (!!currentPageNumber) {
					return ((!!gridPager.oPagerConfig.FirstPage
							&& !!gridPager.oPagerConfig.FirstPage.value
							&& currentPageNumber === gridPager.oPagerConfig.FirstPage.value)
							||
							(!!gridPager.oPagerConfig.PrevPage()
							&& !!gridPager.oPagerConfig.PrevPage().value
							&& currentPageNumber === gridPager.oPagerConfig.PrevPage().value));
				}
			}),
			NextAndLast: ko.computed(function () {
				// Get current page number
				var currentPageNumber = gridPager.getCurrentPage();
				if (!!currentPageNumber) {
					return ((!!gridPager.oPagerConfig.LastPage()
							&& !!gridPager.oPagerConfig.LastPage().value
							&& currentPageNumber === gridPager.oPagerConfig.LastPage().value)
							||
							(!!gridPager.oPagerConfig.NextPage()
							&& !!gridPager.oPagerConfig.NextPage().value
							&& currentPageNumber === gridPager.oPagerConfig.NextPage().value));
				}
			})
		};

		//#endregion

		//#region Html generating methods

		// <summary> Generate  html for text content </summary>
		var _getTextHTML = function (value, observableToBind) {
			var strTemplate = "<span class='pager-text' >{inputValue}</span>"
			return strTemplate.replace('{inputValue}', value);
		}

		// <summary> Generate  html for dropdown content </summary>
		var _getDropDownHTML = function (value, observableToBind) {
			var dropDownTemplate = "<select class='pager-dropdown' data-bind='options: oPagerConfig.PageOptions, " +
																			"value: oPagerConfig.PageSize, " +
																			"event: { change: handleDropDownChange }'></select>";

			gridPager.oPagerConfig.PageSize(value.selectedValue);
			ko.utils.arrayPushAll(gridPager.oPagerConfig.PageOptions, value.options)
			return dropDownTemplate;
		}

		// <summary> Generate  html for textbox content </summary>
		var _getTextBoxHTML = function (value, observableToBind) {
			var textboxTemplate = "<input class='pager-textbox' type='text' data-bind='value: oPagerConfig.CurrentPage," +
																			"event: { blur: handleChange.bind($data, oPagerConfig.CurrentPageObject()) }'></input>";

			gridPager.oPagerConfig.CurrentPage(parseInt(value, 10));

			return textboxTemplate;
		}

		// <summary> Generate  html for total records</summary>
		var _getTotalRecordsHTML = function (value, observableToBind) {
			var totalRecordsTemplate = "<span class='pager-text' data-bind='text: oPagerConfig.TotalRecords'></span>";

			gridPager.oPagerConfig.TotalRecords(value);
			return totalRecordsTemplate;
		}

		// <summary> Generate  html for total pages</summary>
		var _getTotalPagesHTML = function (value, observableToBind) {
			var totalPagesTemplate = "<span class='pager-text' data-bind='text: oPagerConfig.TotalPages'></span>";

			return totalPagesTemplate;
		}

		// <summary> Generate  html for page number links</summary
		var _getPagesLinkHTML = function () {
			var pageLinkTemplate =
					"<!-- ko foreach: oPagerConfig.CurrentPages -->" +
						"<li>" +
							"<a href='#' data-bind='htmlAndTitle: $data," +
													"click: $parent.handleChange.bind(), " +
													"disableClick: $parent.oPagerConfig.CurrentPage() === value'></a>" +
						"</li>" +
					"<!-- /ko -->";

			return pageLinkTemplate;
		}

		// <summary> Get placeholder for page number links </summary>
		var _getPageLinksPlaceHolderHTML = function () {
			var pageLinksPlaceHolderHTML = "{pagerLinksPlaceHolder}"
			return pageLinksPlaceHolderHTML;
		}

		// <summary> Generate  html for first page </summary>
		var _getFirstLinkHTML = function (value, obsevableToBind) {
			var firstLinkTemplate =
				"<li>" +
					"<a href='#' data-bind='htmlAndTitle: oPagerConfig.FirstPage," +
											"click: handleChange.bind($data, oPagerConfig.FirstPage)," +
											"disableClick: oDisabledLinks.FirstAndPrev'></a>" +
				"</li>";

			return firstLinkTemplate;
		}

		// <summary> Generate  html for previous page </summary>
		var _getPreviousLinkHTML = function (value, obsevableToBind) {
			var previousLinkTemplate =
						"<li >" +
							"<a href='#' data-bind='htmlAndTitle: oPagerConfig.PrevPage()," +
													"click: handleChange.bind($data, oPagerConfig.PrevPage())," +
													"disableClick: oDisabledLinks.FirstAndPrev'></a>" +
						"</li>";

			return previousLinkTemplate;
		}

		// <summary> Generate  html for next page </summary>
		var _getNextLinkHTML = function (value, obsevableToBind) {
			var nextLinkTemplate =
						"<li>" +
							"<a href='#' data-bind='htmlAndTitle: oPagerConfig.NextPage()," +
													"click: handleChange.bind($data, oPagerConfig.NextPage())," +
													"disableClick: oDisabledLinks.NextAndLast'></a>" +
						"</li>";

			return nextLinkTemplate;
		}

		// <summary> Generate  html for first page </summary>
		var _getLastLinkHTML = function (value, obsevableToBind) {
			var lastLinkTemplate =
						"<li>" +
							"<a href='#' data-bind='htmlAndTitle: oPagerConfig.LastPage()," +
													"click: handleChange.bind($data, oPagerConfig.LastPage()), " +
													"disableClick: oDisabledLinks.NextAndLast'></a>" +
						"</li>";
			return lastLinkTemplate;
		}

		// <summary> Hash to map Function and Placeholder used to generate HTML </summary>
		gridPager.placeHolderFunction = {
			"Text": _getTextHTML,
			"PageNumbers": _getPageLinksPlaceHolderHTML,
			"FirstPage": _getFirstLinkHTML,
			"PreviousPage": _getPreviousLinkHTML,
			"NextPage": _getNextLinkHTML,
			"LastPage": _getLastLinkHTML,
			"PageSizeOptions": _getDropDownHTML,
			"CurrentPage": _getTextBoxHTML,
			"TotalPages": _getTotalPagesHTML,
			"TotalRecords": _getTotalRecordsHTML,
			"PrevPages": null,
			"NextPages": null
		};

		//#endregion

		//#region Event handlers

		// <summary> Handle page click </summary
		gridPager.handleChange = function (oCurrentPage) {
			var currentConfiguration = gridPager.oPagerConfig,
				currentPageLabel,
				currentPage = parseInt(currentConfiguration.CurrentPage());

			// If page title is string
			if (utilities.isString(oCurrentPage.title)) {
				currentPageLabel = oCurrentPage.title.toLowerCase();
				// Check for first, previous, next and last pages
				switch (currentPageLabel) {
					case 'first': {
						oCurrentPage.value = 1;
						break;
					}
					case 'previous': {
						oCurrentPage.value = !!currentPage && currentPage === 1
												? currentPage
												: (currentPage - 1);
						break;
					}
					case 'next': {
						oCurrentPage.value = !!currentPage && currentPage === currentConfiguration.TotalPages()
												? currentPage
												: (currentPage + 1);
						break;
					}
					case 'last': {
						oCurrentPage.value = currentConfiguration.TotalPages();
						break;
					}
				}
			}

			// Set current page number
			gridPager.setCurrentPage(oCurrentPage);

			// Trigger event onChange
			gridPager.onChange();
		};

		// <summary> Handle drop down change </summary
		gridPager.handleDropDownChange = function () {
			// Reset page number to first page
			gridPager.setCurrentPage(gridPager.oPagerConfig.FirstPage);

			// Trigger event onChange
			gridPager.onChange();
		}

		// <summary> Event for page click </summary
		gridPager.onChange = function () {
		};

		//#endregion

		//#region Objects

		// Check if default configuration is to be overriden with consumer values
		var pagerConfigurationOptions = !!configOptions && !!configOptions.config ? configOptions.config : oDefaultPagerConfig;
		var pagerTemplate = '';
		var pagerHtmlTemplate =
			"<section>" +
			   "{pagerTemplatePlaceHolder}" +
			"</section>"

		// Iterate through the pager config and generate corresponding HTML
		ko.utils.arrayForEach(pagerConfigurationOptions, function (currentConfig) {
			pagerTemplate += gridPager.placeHolderFunction[currentConfig.key](currentConfig.value, currentConfig.key);
		});

		pagerHtmlTemplate = pagerHtmlTemplate.replace('{pagerTemplatePlaceHolder}', pagerTemplate);

		// Now get number links HTML
		var pagerTemplateLinks = _getPagesLinkHTML();

		pagerHtmlTemplate = pagerHtmlTemplate.replace('{pagerLinksPlaceHolder}', pagerTemplateLinks);

		gridPager.pagerHtml = pagerHtmlTemplate;

		//#endregion Objects

		return this;
	};

	//#region Create pager prototype


	GridPager.prototype = {
		// <summary Render pager based on input parameter </summary
		render: function (elementSelector) {
			elementSelector[0].innerHTML += this.pagerHtml;
			ko.applyBindings(this, elementSelector[0]);
		}
	}

	//#endregion

	return GridPager;

});