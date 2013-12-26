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

    /// <summary> Static variable holding unique id of the pager </summary>
    var pagerId = 1;

    // <summary Page object for number links </summary>
    var PageObjectNumbers = function (oCurrentPage) {
        this.htmlFormat = oCurrentPage + 1;
        this.title = oCurrentPage + 1;
        this.value = oCurrentPage + 1;
    };

    // <summary Page object </summary>
    var PageObject = function (currentPageObject) {
        this.htmlFormat = currentPageObject.htmlFormat;
        this.title = currentPageObject.title;
        this.value = currentPageObject.value;
    };

    /**
	* Grid Pager
	* @param: Pager configurations
	* @returns: Pager function for grid pagers
	* <summary> Implementation for grid pager </summary>
	*/
    function GridPager(config) {

        //#region (Private) Properties and functions

        var gridPager = this;

        // <summary> Pager configuration </summary>
        var pagerConfig = {
            // Event handler for pager changes 
            onChange : $.noop
        };

        // Id for current pager
        var Id = ++pagerId;

        // <summary> Extend pager configuration </summary>
        pagerConfig = $.extend(pagerConfig, config);

        //#endregion

        //#region (Public) Initial properties and methods

        // <summary Initialize pager properties and render </summary
        gridPager.render = function (elementSelector) {
            var pagerTemplate = '',
				configObject,
                pagerHtml = "<section class='grid-pager'>{pagerTemplatePlaceHolder}</section>";

            // Check if pager template is passed or custom user configuration is passed
            if (pagerConfig.hasOwnProperty('template') && !!pagerConfig.template) {
                configObject = pagerConfig.template;
            } else {
                // Check if default configuration is to be overriden with consumer values 
                if (!!pagerConfig && !!pagerConfig.configuration && utilities.isArray(pagerConfig.configuration)) {
                    configObject = pagerConfig.configuration;
                } else {
                    throw 'Invalid configuration for pager';
                }
            }

            // Iterate through the pager config to generate corresponding HTML
            ko.utils.arrayForEach(configObject, function (currentConfig) {
                for (var key in currentConfig) {
                    if (currentConfig.hasOwnProperty(key)) {
                        pagerTemplate += gridPager.placeHolder[key](currentConfig[key]);
                    }
                }
            });

            pagerHtml = pagerHtml.replace('{pagerTemplatePlaceHolder}', pagerTemplate);

            // Get page number links HTML
            pagerHtml = pagerHtml.replace('{pagerLinksPlaceHolder}', getPagesLinkHTML());

            // Render the pager
            elementSelector[0].innerHTML += pagerHtml;
            ko.applyBindings(pager, elementSelector[0]);

            return this;
        };

        //#endregion

        //#region (Private) Pager object to be rendered

        /// <summary> Private object with all pager properties required for internnal logic</summary>
        var pager = new (function () {
            var self = this;
            // Total no of records in current grid
            this.totalRecords = ko.observable(50),
            // Total no of page links to be shown at a time
			this.numberOfLinks = ko.observable(10),
            // Store position of first page in current shown pages for finding previous pages using (...) links
            // and visibilty of (...) link
			this.previousPages = {
			    index: ko.observable(1),
			    visible: ko.observable(false)
			},
            // Store position of last page in current shown pages for finding next pages using (...) links
            // and visibilty of (...) link
			this.nextPages = {
			    index: ko.observable(self.numberOfLinks()),
			    visible: ko.observable(false)
			},
            // Page size options for dropdown values
			this.pageOptions = [],
            // Current page size selected from dropdown
			this.pageSize = ko.observable(10),
            // Find total no of pages based on Total no of records and current page size 
			this.totalPages = ko.computed({
			    read: function () {
			        return Math.ceil(self.totalRecords() / self.pageSize());
			    }
			}),
            // First page of all the pages
			this.firstPage = new PageObject({
			    htmlFormat: '&laquo;',
			    title: 'first page',
			    value: 1
			});
            // Last page of pager
            this.lastPage = ko.computed({
                read: function () {
                    var totalNoOfPages = self.totalPages();

                    if (!!!totalNoOfPages) {
                        // Initial state
                        totalNoOfPages = 0;
                    } else {
                        totalNoOfPages = totalNoOfPages;
                    }

                    return new PageObject({
                        htmlFormat: '&raquo;',
                        title: 'last page',
                        value: totalNoOfPages
                    });
                }
            });
            // Current page
            this.currentPage = ko.observable(1);
            // Next page
            this.nextPage = ko.computed({
                read: function () {
                    var currentPage = self.currentPage();

                    if (!!currentPage) {
                        if (currentPage === self.totalPages()) {
                            return new PageObject({
                                htmlFormat: '&gt;',
                                title: 'next page',
                                value: currentPage
                            });
                        } else {
                            return new PageObject({
                                htmlFormat: '&gt;',
                                title: 'next page',
                                value: currentPage + 1
                            });
                        }
                    }
                }
            });
            // Previous page
            this.previousPage = ko.computed({
                read: function () {
                    var currentPage = self.currentPage();

                    if (!!currentPage) {
                        if (currentPage === 1) {
                            return new PageObject({
                                htmlFormat: '&lt;',
                                title: 'previous page',
                                value: currentPage
                            });
                        } else {
                            return new PageObject({
                                htmlFormat: '&lt;',
                                title: 'previous page',
                                value: currentPage - 1
                            });
                        }
                    }
                }
            });
            // Object holding current page data
            this.currentPageObject = ko.computed({
                read: function () {
                    var currentPage = parseInt(self.currentPage());
                    return new PageObject({
                        htmlFormat: currentPage,
                        title: currentPage,
                        value: currentPage
                    });
                }
            });
            // Array of object for all page numbers
            this.pageNumbers = ko.computed({
                read: function () {
                    // Create array of size of total pages
                    // and generate dynamic pages based on total pages
                    var linksSimpleArray = [];
                    for (var index = 0; index < self.totalPages() ; index++) {
                        // Create page object with value equal to current index in array
                        linksSimpleArray.push(new PageObjectNumbers(index));
                    }

                    return linksSimpleArray;
                }
            });
            // Array of pages for currently shown pages from all pages
            this.currentPages = ko.computed({
                read: function () {
                    var startPageIndex = self.previousPages.index(),
						endPageIndex = self.nextPages.index(),
						maxPageIndex = !!self.pageNumbers() ? self.pageNumbers() : [],
						currentPages = [];

                    currentPages = maxPageIndex.slice(startPageIndex - 1, endPageIndex);

                    // Case a: if max page number is more than Number of links to be shown (...)
                    if (endPageIndex >= maxPageIndex.length) {
                        self.nextPages.visible(false);
                    }
                        // Case b: if max page number is less than Number of links to be shown
                    else {
                        self.nextPages.visible(true);
                    }

                    return currentPages;
                }
            });
            // Disabled First & Previous links
            this.disabledFirstAndPrevious = ko.computed({
                read: function () {
                    // Get current page number
                    var currentPageNumber = !isNaN(self.currentPage()) ? self.currentPage() : 1;
                    if (!!currentPageNumber) {
                        return ((!!self.firstPage && !!self.firstPage.value && currentPageNumber === self.firstPage.value)
								||
								(!!self.previousPage() && !!self.previousPage().value && currentPageNumber === self.previousPage().value));
                    }
                }
            });
            //Disabled Next and Last links
            this.disabledNextAndLast = ko.computed({
                read: function () {
                    // Get current page number
                    var currentPageNumber = !isNaN(self.currentPage()) ? self.currentPage() : 1;
                    if (!!currentPageNumber) {
                        return ((!!self.lastPage() && !!self.lastPage().value && currentPageNumber === self.lastPage().value)
								||
								(!!self.nextPage() && !!self.nextPage().value && currentPageNumber === self.nextPage().value));
                    }
                }
            });
        })();

        /// <summary> Set current page  </summary>
        var setCurrentPage = function (oPage) {
            if (!isNaN(parseInt(oPage.value, 10))) {
                pager.currentPage(oPage.value);
            } else {
                throw 'Page number ' + oPage.value + ' is not number';
            }
        };

        // Pager configuration to be exposed
        var oPagerConfig = {
            currentPage: 1,
            pageSize: 0
        };

        // Subscribe to current page changes
        pager.currentPage.subscribe(function (newValue) {
            oPagerConfig.currentPage = newValue;
        });

        // Subscribe to page sizechanges
        pager.pageSize.subscribe(function (newValue) {
            oPagerConfig.pageSize = newValue;
        });

        //#endregion

        //#region (Private) Html generating methods

        /// <summary> Generate  html for text content </summary>
        var getTextHTML = function (textObject) {

            var strTemplate = "<span class='pager-text' {stylePlaceHolder}>{inputValue}</span>";
            var styleTemplate;

            if (!!textObject && !!textObject.attr) {
                styleTemplate = "data-bind='attr: {textStyleAttribute}'";

                // Get stringified object
                var attrString = utilities.joinKeyValuePairWithQuotes(textObject.attr, ':', ',');
                styleTemplate = styleTemplate.replace('{textStyleAttribute}', attrString);
            } else {
                styleTemplate = '';
            }

            strTemplate = strTemplate.replace('{stylePlaceHolder}', styleTemplate);
            return strTemplate.replace('{inputValue}', textObject.value);
        };

        /// <summary> Generate  html for dropdown content </summary>
        var getDropDownHTML = function (dropDownObject) {
            var dropDownTemplate = "<select class='pager-dropdown' data-bind='options: pageOptions, " +
																			"value: pageSize, " +
																			"event: { change: handleDropDownChange }'></select>";

            // Set default page size
            var defaultPageSize = (!!pagerConfig && !!pagerConfig.pageSize) ? parseInt(pagerConfig.pageSize, 10) : 10;
            pager.pageSize(defaultPageSize);

            // Set default page options
            var defaultPageOptions = (!!pagerConfig && !!pagerConfig.pageOptions) ? pagerConfig.pageOptions : [];
            ko.utils.arrayPushAll(pager.pageOptions, defaultPageOptions);

            return dropDownTemplate;
        };

        /// <summary> Generate  html for textbox content </summary>
        var getTextBoxHTML = function (currentPageObject) {
            var textboxTemplate = "<input class='pager-textbox' type='text' data-bind='value: currentPage," +
																			"event: { blur: handleChange.bind($data, currentPageObject()) }'></input>";

            var currentPageNumber = parseInt(!!currentPageObject && !!currentPageObject.value ?
											currentPageObject.value :
											1, 10);

            pager.currentPage(currentPageNumber);

            return textboxTemplate;
        };

        /// <summary> Generate  html for total records</summary>
        var getTotalRecordsHTML = function (totalRecordsObject) {
            var totalRecordsTemplate = "<span class='pager-text' data-bind='text: totalRecords'></span>";

            var totalGridRecords = (!!pagerConfig && !!pagerConfig.totalRecords) ? parseInt(pagerConfig.totalRecords, 10) : 0;

            pager.totalRecords(totalGridRecords);
            return totalRecordsTemplate;
        };

        /// <summary> Generate  html for total pages</summary>
        var getTotalPagesHTML = function (value) {
            var totalPagesTemplate = "<span class='pager-text' data-bind='text: totalPages'></span>";

            return totalPagesTemplate;
        };

        /// <summary> Generate  html for navigating to next pages (...)</summary>
        var getNextPagesLink = function (value) {
            var nextPageslink =
					"<li>" +
						"<a href='#' data-bind='text: &apos;...&apos;," +
												"visible: nextPages.visible()," +
												"click: getNextPages.bind($data, nextPages.index(), numberOfLinks())'>" +
					"</li>";

            var links = (!!pagerConfig && !!pagerConfig.numberOfLinks) ? parseInt(pagerConfig.numberOfLinks, 10) : 10;
            pager.numberOfLinks(links);
            return nextPageslink;
        };

        /// <summary> Generate  html for navigating to previous pages (...)</summary>
        var getPreviousPagesLink = function (value) {
            var previousPageslink =
					"<li>" +
						"<a href='#' data-bind='text: &apos;...&apos;," +
												"visible: previousPages.visible()," +
												"click: getPreviousPages.bind($data, previousPages.index(), numberOfLinks())'>" +
					"</li>";

            return previousPageslink;
        };

        /// <summary> Generate  html for page number links</summary
        var getPagesLinkHTML = function () {
            var pageLinkTemplate =
					getPreviousPagesLink() +
					"<!-- ko foreach: currentPages -->" +
						"<li>" +
							"<a href='#' data-bind='htmlAndTitle: $data, " +
											"click: $parent.handleChange.bind()," +
											"disableClick: $parent.currentPage() === value'></a>" +
						"</li>" +
					"<!-- /ko -->" +
					getNextPagesLink();
            return pageLinkTemplate;
        };

        /// <summary> Get placeholder for page number links </summary>
        var getPageLinksPlaceHolderHTML = function () {
            var pageLinksPlaceHolderHTML = "{pagerLinksPlaceHolder}";
            return pageLinksPlaceHolderHTML;
        };

        /// <summary> Generate  html for first page </summary>
        var getFirstLinkHTML = function (value) {
            var firstLinkTemplate =
				"<li>" +
					"<a href='#' id='first' data-bind='htmlAndTitle: firstPage," +
											"click: handleChange.bind($data, firstPage)," +
											"disableClick: disabledFirstAndPrevious'></a>" +
				"</li>";

            return firstLinkTemplate;
        };

        /// <summary> Generate  html for previous page </summary>
        var getPreviousLinkHTML = function (value) {
            var previousLinkTemplate =
						"<li >" +
							"<a href='#' data-bind='htmlAndTitle: previousPage()," +
													"click: handleChange.bind($data, previousPage())," +
													"disableClick: disabledFirstAndPrevious'></a>" +
						"</li>";

            return previousLinkTemplate;
        };

        /// <summary> Generate  html for next page </summary>
        var getNextLinkHTML = function (value) {
            var nextLinkTemplate =
						"<li>" +
							"<a href='#' data-bind='htmlAndTitle: nextPage()," +
													"click: handleChange.bind($data, nextPage())," +
													"disableClick: disabledNextAndLast'></a>" +
						"</li>";

            return nextLinkTemplate;
        };

        /// <summary> Generate  html for first page </summary>
        var getLastLinkHTML = function (value) {
            var lastLinkTemplate =
						"<li>" +
							"<a href='#' data-bind='htmlAndTitle: lastPage()," +
													"click: handleChange.bind($data, lastPage()), " +
													"disableClick: disabledNextAndLast'></a>" +
						"</li>";
            return lastLinkTemplate;
        };

        //#endregion

        //#region (Private) Event handlers

        /// <summary> Handle Next pages click </summary>
        pager.getNextPages = function (endPageIndex, numberOfLinks) {
            // Start Page Index
            pager.previousPages.index(endPageIndex + 1);

            // Set current page
            pager.currentPage(endPageIndex + 1);

            // Show get previous links option
            pager.previousPages.visible(true);

            // Set end page indexes  
            if (endPageIndex + numberOfLinks > pager.pageNumbers().length) {
                pager.nextPages.index(pager.pageNumbers().length);
            } else {
                pager.nextPages.index(endPageIndex + numberOfLinks);
            }

            // Trigger event onChange
            pagerConfig.onChange(oPagerConfig);
        };

        /// <summary> Handle Previous pages click </summary>
        pager.getPreviousPages = function (startPageIndex, numberOfLinks) {
            // Set end page index
            pager.nextPages.index(startPageIndex - 1);

            // Set current page
            pager.currentPage(startPageIndex - 1);

            // Show get next links option
            pager.nextPages.visible(true);

            // Set end page indexes  
            if (startPageIndex - numberOfLinks <= 1) {
                pager.previousPages.index(1);
                pager.previousPages.visible(false);
            } else {
                pager.previousPages.index(startPageIndex - numberOfLinks);
            }

            // Trigger event onChange
            pagerConfig.onChange(oPagerConfig);
        };

        /// <summary> Handle page click </summary
        pager.handleChange = function (oCurrentPage) {
            var currentPageLabel,
				currentPage = parseInt(pager.currentPage());

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
                        oCurrentPage.value = !!currentPage && currentPage === 1 ?
                            currentPage : (currentPage - 1);
                        break;
                    }
                    case 'next': {
                        oCurrentPage.value = !!currentPage && currentPage === pager.totalPages() ?
                            currentPage : (currentPage + 1);
                        break;
                    }
                    case 'last': {
                        oCurrentPage.value = pager.totalPages();
                        break;
                    }
                }
            }

            // Handle prev page click for start page
            // Here 1 is to compensate the CurrentPage()-1 of previous page value from oCurrentPage.value
            if (oCurrentPage.value % pager.numberOfLinks() === 0) {
                pager.getPreviousPages(oCurrentPage.value + 1, pager.numberOfLinks());
            }

            // Handle next page click for end page
            // Here 1 is to compensate the CurrentPage() + 1 of next page value from oCurrentPage.value
            if (oCurrentPage.value % pager.numberOfLinks() === 1) {
                pager.getNextPages(oCurrentPage.value - 1, pager.numberOfLinks());
            }

            // Handle first page click and hide previouslink option
            if (oCurrentPage.value === 1) {
                pager.previousPages.visible(false);
            }

            // Handle last page click and hide nextlinks option
            if (oCurrentPage.value === pager.pageNumbers().length) {

                // Set start and last page index
                var pageOffset = pager.pageNumbers().length % pager.numberOfLinks();
                pager.previousPages.index(pager.pageNumbers().length - pageOffset + 1);
                pager.nextPages.index(pager.pageNumbers().length);

                // Set visibility
                pager.nextPages.visible(false);
                if (pager.previousPages.index() !== 1) {
                    pager.previousPages.visible(true);
                } else {
                    pager.previousPages.visible(false);
                }

            }

            // Set current page number
            setCurrentPage(oCurrentPage);

            // Trigger event onChange
            pagerConfig.onChange(oPagerConfig);
        };

        /// <summary> Handle drop down change </summary
        pager.handleDropDownChange = function () {
            // Reset page number to first page
            setCurrentPage(pager.firstPage);

            // Reset start and end page indexes and hide StartPage Links
            pager.previousPages.index(1);
            pager.nextPages.index(pager.numberOfLinks());
            pager.previousPages.visible(false);

            // Trigger event onChange
            pagerConfig.onChange(oPagerConfig);
        };

        //#endregion

        //#region (Public) Expose public Objects

        /// <summary> Hash to map Function and Placeholder used to generate HTML </summary>
        gridPager.placeHolder = {
            "Text": getTextHTML,
            "PageNumbers": getPageLinksPlaceHolderHTML,
            "FirstPage": getFirstLinkHTML,
            "PreviousPage": getPreviousLinkHTML,
            "NextPage": getNextLinkHTML,
            "LastPage": getLastLinkHTML,
            "PageSizeOptions": getDropDownHTML,
            "CurrentPage": getTextBoxHTML,
            "TotalPages": getTotalPagesHTML,
            "TotalRecords": getTotalRecordsHTML
        };

        // <summary Define set of configurations </summary>
        gridPager.getPagerConfig = function () {
            if (!!pagerConfig) {
                $.extend(oPagerConfig, pagerConfig);
                return oPagerConfig;
            }
        };

        /// <summary> get current page value </summary>
        gridPager.getCurrentPage = function () {
            var currentPage = pager.currentPage();
            if (utilities.isNumber(currentPage)) {
                var currentNumber = parseInt(currentPage, 10);
                return (!isNaN(currentNumber) ? currentNumber : 1);
            }
            return null;
        };

        /// <summary> Expose pager properties on refresh </summary>
        gridPager.refresh = function () {
            return this;
        };

        //#endregion Objects

        $("a").click(function (e) {
            if (!!$(this).attr("id")) {
                window.location.hash = $(this).attr("id");
                e.preventDefault();
            }
        });

        return this;
    }

    /// <summary> Pager configuration templates available by default </summary>
    GridPager.pagerTemplates = {
        basicTemplate: [
                {
                    FirstPage: {
                        htmlFormat: '&laquo;', title: 'first'
                    }
                },
                {
                    PreviousPage: {
                        htmlFormat: '&lt;', title: 'previous', value: null
                    }
                },
                {
                    PageNumbers: {
                        value: []
                    }
                },
                {
                    NextPage: {
                        htmlFormat: '&gt;', title: 'next', value: null
                    }
                },
                {
                    LastPage: {
                        htmlFormat: '&raquo;', title: 'last', value: null
                    }
                },
                {
                    Text: {
                        value: 'Page Size'
                    }
                },
                {
                    PageSizeOptions: {
                        options: [1, 2, 5, 10, 20, 50]
                    }
                },
                {
                    Text: {
                        value: 'Showing page',
                        attr: {
                            style: "max-height: 500px;",
                            css: "somethingelse someother"
                        }
                    }
                },
                {
                    CurrentPage: {
                        value: 1
                    }
                },
                {
                    Text: {
                        value: 'of'
                    }
                },
                {
                    TotalPages: {
                        value: 0
                    }
                },
                {
                    Text: {
                        value: 'for'
                    }
                },
                {
                    TotalRecords: {
                        value: 30
                    }
                },
                {
                    Text: {
                        value: 'records'
                    }
                }
        ]
    };

    return GridPager;

});