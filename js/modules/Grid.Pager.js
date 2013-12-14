//https://github.com/remcoros/ko.pager/wiki
// Grid pagination util
define([
	"vendor/knockout-3.0.0",
	"jquery",
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
					options: [10, 20, 30, 50],
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
				value: 0
			},
			{
				key: 'Text',
				value: 'records'
			}
	];
	//#endregion

	/**
	* Grid Pager
	* @param: Pager configurations
	* @returns: Pager function for grid pagers
	* <summary> Implementation for grid pager </summary>
	*/
	function GridPager(pagerConfig) {

		var gridPager = this;

		//#region Generate custom template based html

		// <summary Page object for number links </summary>
		var pageObjectNumbers = function (oCurrentPage) {
			this.htmlContent = oCurrentPage + 1;
			this.title = oCurrentPage + 1;
			this.value = oCurrentPage + 1;
		};

		// <summary Page object </summary>
		var pageObject = function (currentPageObject) {
			this.htmlContent = currentPageObject.htmlContent;
			this.title = currentPageObject.title;
			this.value = currentPageObject.value;
		};

		// <summary Define set of configurations </summary>
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

		gridPager.StartPage = {
			index: ko.observable(1),
			visible: ko.observable(false)
		};
		gridPager.EndPage = {
			index: ko.observable(gridPager.oPagerConfig.NumberOfLinks()),
			visible: ko.observable(false)
		};

		// <summary Find total pages </summary>
		gridPager.oPagerConfig.TotalPages = ko.computed(function () {
			return Math.ceil(gridPager.oPagerConfig.TotalRecords() / gridPager.oPagerConfig.PageSize());
		});

		// <summary Last page </summary>
		gridPager.oPagerConfig.LastPage = ko.computed(function () {
			var totalNoOfPages = gridPager.oPagerConfig.TotalPages();

			if (!!!totalNoOfPages) {
				// Initial state
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

		// <summary Next page </summary>
		gridPager.oPagerConfig.NextPage = ko.computed(function () {
			var currentPage = gridPager.oPagerConfig.CurrentPage();

			if (!!currentPage) {
				if (currentPage === gridPager.oPagerConfig.TotalPages()) {
					return new pageObject({
						htmlContent: '&gt;',
						title: 'next page',
						value: currentPage
					})
				} else {
					return new pageObject({
						htmlContent: '&gt;',
						title: 'next page',
						value: currentPage + 1
					})
				}
			}
		});

		// <summary Prev page </summary>
		gridPager.oPagerConfig.PrevPage = ko.computed(function () {
			var currentPage = gridPager.oPagerConfig.CurrentPage();

			if (!!currentPage) {
				if (currentPage === 1) {
					return new pageObject({
						htmlContent: '&lt;',
						title: 'previous page',
						value: currentPage
					})
				} else {
					return new pageObject({
						htmlContent: '&lt;',
						title: 'previous page',
						value: currentPage - 1
					})
				}
			}
		});

		// <summary Current page object </summary>
		gridPager.oPagerConfig.CurrentPageObject = ko.computed(function () {
			var currentPage = parseInt(gridPager.oPagerConfig.CurrentPage());
			return new pageObject({
				htmlContent: currentPage,
				title: currentPage,
				value: currentPage
			});
		});

		// <summary Create all links for pages </summary>
		gridPager.oPagerConfig.PageNumbers = ko.computed(function () {

			// Create observable array of size of total pages
			// and generate dynamic pages based on total pages
			var linksSimpleArray = [];
			for (var index = 0; index < gridPager.oPagerConfig.TotalPages() ; index++) {

				// Create page object with value equal to current index in array
				linksSimpleArray.push(new pageObjectNumbers(index));
			}

			return linksSimpleArray;
		});

		/// <summary> get current page value </summary>
		gridPager.getCurrentPage = function () {
			var currentPage = gridPager.oPagerConfig.CurrentPage();
			if (utilities.isNumber(currentPage)) {
				var currentNumber = parseInt(currentPage, 10);
				return (!isNaN(currentNumber) ? currentNumber : 1);
			}
			return null;
		};

		// <summary Generate  html for currently shown pages out of all pages </summary>
		gridPager.oPagerConfig.CurrentPages = ko.computed({
			read: function () {
				var config = gridPager.oPagerConfig,
					startPageIndex = gridPager.StartPage.index()
					, endPageIndex = gridPager.EndPage.index()
					, maxPageIndex = !!config.PageNumbers() ? config.PageNumbers() : []
					, currentPages = [];

				currentPages = maxPageIndex.slice(startPageIndex - 1, endPageIndex);

				// Case a: if max page number is more than Number of links to be shown (...)
				if (endPageIndex >= maxPageIndex.length) {
					gridPager.EndPage.visible(false);
				}
					// Case b: if max page number is less than Number of links to be shown
				else {
					gridPager.EndPage.visible(true);
				}

				return currentPages;
			}
		});

		/// <summary> Set current page  </summary>
		gridPager.setCurrentPage = function (oPage) {
			if (utilities.isNumber(parseInt(oPage.value, 10))) {
				gridPager.oPagerConfig.CurrentPage(oPage.value);
			} else {
				throw 'Page number ' + oPage.value + ' is not number';
			}
		};

		/// <summary> Disable links  </summary>
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

		/// <summary> Generate  html for text content </summary>
		var _getTextHTML = function (value) {
			var strTemplate = "<span class='pager-text' >{inputValue}</span>"
			return strTemplate.replace('{inputValue}', value);
		}

		/// <summary> Generate  html for dropdown content </summary>
		var _getDropDownHTML = function (value) {
			var dropDownTemplate = "<select class='pager-dropdown' data-bind='options: oPagerConfig.PageOptions, " +
																			"value: oPagerConfig.PageSize, " +
																			"event: { change: handleDropDownChange }'></select>";

			gridPager.oPagerConfig.PageSize(value.selectedValue);
			ko.utils.arrayPushAll(gridPager.oPagerConfig.PageOptions, value.options)
			return dropDownTemplate;
		}

		/// <summary> Generate  html for textbox content </summary>
		var _getTextBoxHTML = function (value) {
			var textboxTemplate = "<input class='pager-textbox' type='text' data-bind='value: oPagerConfig.CurrentPage," +
																			"event: { blur: handleChange.bind($data, oPagerConfig.CurrentPageObject()) }'></input>";

			gridPager.oPagerConfig.CurrentPage(parseInt(value, 10));

			return textboxTemplate;
		}

		/// <summary> Generate  html for total records</summary>
		var _getTotalRecordsHTML = function (value) {
			var totalRecordsTemplate = "<span class='pager-text' data-bind='text: oPagerConfig.TotalRecords'></span>";

			gridPager.oPagerConfig.TotalRecords(value);
			return totalRecordsTemplate;
		}

		/// <summary> Generate  html for total pages</summary>
		var _getTotalPagesHTML = function (value) {
			var totalPagesTemplate = "<span class='pager-text' data-bind='text: oPagerConfig.TotalPages'></span>";

			return totalPagesTemplate;
		}

		/// <summary> Generate  html for navigating to next pages (...)</summary>
		var _getNextPagesLink = function (value) {
			var nextPageslink =
					"<li>" +
						"<a href='#' data-bind='text: &apos;...&apos;," +
												"visible: EndPage.visible()," +
												"click: getNextPages.bind($data, EndPage.index(), oPagerConfig.NumberOfLinks())'>" +
					"</li>"

			return nextPageslink;
		}

		/// <summary> Generate  html for navigating to previous pages (...)</summary>
		var _getPreviousPagesLink = function (value) {
			var previousPageslink =
					"<li>" +
						"<a href='#' data-bind='text: &apos;...&apos;," +
												"visible: StartPage.visible()," +
												"click: getPreviousPages.bind($data, StartPage.index(), oPagerConfig.NumberOfLinks())'>" +
					"</li>"

			return previousPageslink;
		}

		/// <summary> Generate  html for page number links</summary
		var _getPagesLinkHTML = function () {
			var pageLinkTemplate =
					//"<!-- ko foreach: oPagerConfig.CurrentPages -->" +
					//	"<button class='btn' data-bind='click: $parent.handleChange.bind(), disable: $parent.oPagerConfig.CurrentPage() === value'>" +
					//		"<i data-bind='html: $data.value'></i>" +
					//	"</button>" +
					//"<!-- /ko -->";
					_getPreviousPagesLink() +
					"<!-- ko foreach: oPagerConfig.CurrentPages -->" +
						"<li>" +
							"<a href='#' data-bind='htmlAndTitle: $data, " +
											"click: $parent.handleChange.bind()," +
											"disableClick: $parent.oPagerConfig.CurrentPage() === value'></a>" +
						"</li>" +
					"<!-- /ko -->" +
					_getNextPagesLink();
			return pageLinkTemplate;
		}

		/// <summary> Get placeholder for page number links </summary>
		var _getPageLinksPlaceHolderHTML = function () {
			var pageLinksPlaceHolderHTML = "{pagerLinksPlaceHolder}"
			return pageLinksPlaceHolderHTML;
		}

		/// <summary> Generate  html for first page </summary>
		var _getFirstLinkHTML = function (value) {
			var firstLinkTemplate =
				"<li>" +
					"<a href='#' id='first' data-bind='htmlAndTitle: oPagerConfig.FirstPage," +
											"click: handleChange.bind($data, oPagerConfig.FirstPage)," +
											"disableClick: oDisabledLinks.FirstAndPrev'></a>" +
				"</li>";

			//gridPager.oPagerConfig.FirstPage = value;

			return firstLinkTemplate;
		}

		/// <summary> Generate  html for previous page </summary>
		var _getPreviousLinkHTML = function (value) {
			var previousLinkTemplate =
						"<li >" +
							"<a href='#' data-bind='htmlAndTitle: oPagerConfig.PrevPage()," +
													"click: handleChange.bind($data, oPagerConfig.PrevPage())," +
													"disableClick: oDisabledLinks.FirstAndPrev'></a>" +
						"</li>";

			return previousLinkTemplate;
		}

		/// <summary> Generate  html for next page </summary>
		var _getNextLinkHTML = function (value) {
			var nextLinkTemplate =
						"<li>" +
							"<a href='#' data-bind='htmlAndTitle: oPagerConfig.NextPage()," +
													"click: handleChange.bind($data, oPagerConfig.NextPage())," +
													"disableClick: oDisabledLinks.NextAndLast'></a>" +
						"</li>";

			return nextLinkTemplate;
		}

		/// <summary> Generate  html for first page </summary>
		var _getLastLinkHTML = function (value) {
			var lastLinkTemplate =
						"<li>" +
							"<a href='#' data-bind='htmlAndTitle: oPagerConfig.LastPage()," +
													"click: handleChange.bind($data, oPagerConfig.LastPage()), " +
													"disableClick: oDisabledLinks.NextAndLast'></a>" +
						"</li>";
			return lastLinkTemplate;
		}

		/// <summary> Hash to map Function and Placeholder used to generate HTML </summary>
		var _placeHolder = {
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

		/// <summary> Handle Next pages click </summary>
		gridPager.getNextPages = function (endPageIndex, numberOfLinks) {
			var config = gridPager.oPagerConfig;

			// Start Page Index
			gridPager.StartPage.index(endPageIndex + 1);

			// Set current page
			gridPager.oPagerConfig.CurrentPage(endPageIndex + 1);

			// Show get previous links option
			gridPager.StartPage.visible(true);

			// Set end page indexes  
			if (endPageIndex + numberOfLinks > config.PageNumbers().length) {
				gridPager.EndPage.index(config.PageNumbers().length);
			} else {
				gridPager.EndPage.index(endPageIndex + numberOfLinks);
			}

			// Trigger event onChange
			gridPager.onChange();
		};

		/// <summary> Handle Previous pages click </summary>
		gridPager.getPreviousPages = function (startPageIndex, numberOfLinks) {
			// Set end page index
			gridPager.EndPage.index(startPageIndex - 1);

			// Set current page
			gridPager.oPagerConfig.CurrentPage(startPageIndex - 1);

			// Show get next links option
			gridPager.EndPage.visible(true);

			// Set end page indexes  
			if (startPageIndex - numberOfLinks <= 1) {
				gridPager.StartPage.index(1);
				gridPager.StartPage.visible(false);
			} else {
				gridPager.StartPage.index(startPageIndex - numberOfLinks);
			}

			// Trigger event onChange
			gridPager.onChange();
		};

		/// <summary> Handle page click </summary
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

			// Handle prev page click for start page
			// Here 1 is to compensate the CurrentPage()-1 of previous page value from oCurrentPage.value
			if (oCurrentPage.value % currentConfiguration.NumberOfLinks() === 0) {
				gridPager.getPreviousPages(oCurrentPage.value + 1, currentConfiguration.NumberOfLinks());
			}

			// Handle next page click for end page
			// Here 1 is to compensate the CurrentPage() + 1 of next page value from oCurrentPage.value
			if (oCurrentPage.value % currentConfiguration.NumberOfLinks() === 1) {
				gridPager.getNextPages(oCurrentPage.value - 1, currentConfiguration.NumberOfLinks());
			}

			// Handle first page click and hide previouslink option
			if (oCurrentPage.value === 1) {
				gridPager.StartPage.visible(false);
			}

			// Handle last page click and hide nextlinks option
			if (oCurrentPage.value === gridPager.oPagerConfig.PageNumbers().length) {

				// Set start and last page index
				var pageOffset = gridPager.oPagerConfig.PageNumbers().length % gridPager.oPagerConfig.NumberOfLinks();
				gridPager.StartPage.index(gridPager.oPagerConfig.PageNumbers().length - pageOffset + 1);
				gridPager.EndPage.index(gridPager.oPagerConfig.PageNumbers().length);

				// Set visibility
				gridPager.EndPage.visible(false);
				if (gridPager.StartPage.index() !== 1) {
					gridPager.StartPage.visible(true);
				} else {
					gridPager.StartPage.visible(false);
				}

			}

			// Set current page number
			gridPager.setCurrentPage(oCurrentPage);

			// Trigger event onChange
			gridPager.onChange();
		};

		/// <summary> Handle drop down change </summary
		gridPager.handleDropDownChange = function () {
			// Reset page number to first page
			gridPager.setCurrentPage(gridPager.oPagerConfig.FirstPage);

			// Reset start and end page indexes and hide StartPage Links
			gridPager.StartPage.index(1);
			gridPager.EndPage.index(gridPager.oPagerConfig.NumberOfLinks());
			gridPager.StartPage.visible(false);

			// Trigger event onChange
			gridPager.onChange();
		}

		/// <summary> Event for page click </summary
		gridPager.onChange = function () {
		};

		//#endregion

		//#region Objects

		// Check if default configuration is to be overriden with consumer values
		var pagerConfigurationOptions = !!pagerConfig && !!pagerConfig.config ? pagerConfig.config : oDefaultPagerConfig;
		var pagerTemplate = '';
		var pagerHtmlTemplate =
			"<section class='grid-pager'>" +
			   "{pagerTemplatePlaceHolder}" +
			"</section>"

		// Iterate through the pager config and generate corresponding HTML
		ko.utils.arrayForEach(pagerConfigurationOptions, function (currentConfig) {
			pagerTemplate += _placeHolder[currentConfig.key](currentConfig.value);
		});

		pagerHtmlTemplate = pagerHtmlTemplate.replace('{pagerTemplatePlaceHolder}', pagerTemplate);

		// Now get number links HTML
		var pagerTemplateLinks = _getPagesLinkHTML();

		pagerHtmlTemplate = pagerHtmlTemplate.replace('{pagerLinksPlaceHolder}', pagerTemplateLinks);

		gridPager.pagerHtml = pagerHtmlTemplate;

		//#endregion Objects

		$("a").click(function (e) {
			if (!!$(this).attr("id")) {
				window.location.hash = $(this).attr("id");
				e.preventDefault();
			}
		});

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