define([
	"vendor/knockout-3.0.0",
	"jquery"
],
function (
	ko,
	$) {
		"use strict";
	
		/**
	* Mention method description
	* @param: null
	* @returns: 
	* <summary> Other details </summary>
	*/
		function KnockoutUtilities() {
		
				//#region Custom bindings
		
				// <summary> Add html content as well as label to element </summary>
				ko.bindingHandlers['htmlAndTitle'] = {
						update: function (element, valueAccessor) {
								var value = ko.unwrap(valueAccessor());
				
								if (!!value) {
										// Add text to element
										$(element).html(value.htmlFormat);
										// Add title to element
										$(element).attr('title', ('Go to ' + value.title))
									}
							}
				};
	
			/// <summary> Prevent bubble up of events </summary>
			ko.bindingHandlers['preventBubble'] = {
					init: function (element, valueAccessor) {
							var eventName = ko.utils.unwrapObservable(valueAccessor());
							ko.utils.registerEventHandler(element, eventName, function (event) {
									event.cancelBubble = true;
									if (event.stopPropagation) {
											event.stopPropagation();
										}
								});
						}
			};
	
			// <summary> Disable click for elements </summary>
			ko.bindingHandlers['disableClick'] = {
					init: function (element, valueAccessor) {
							$(element).click(function (evt) {
									if (valueAccessor())
										evt.preventDefault();
								});
			
						},
			
						update: function (element, valueAccessor) {
								var value = ko.utils.unwrapObservable(valueAccessor());
								ko.bindingHandlers.css.update(element, function () {
										return { 'disabled-anchor': value };
								});
				}
		};

		// <summary> Add css class to element </summary>
		ko.bindingHandlers['class'] = {
				update: function (element, valueAccessor, allValueAccessor) {
						var boundObject = ko.utils.unwrapObservable(valueAccessor()),
							className = boundObject.className,
							isCursorPointer = !!boundObject.isCursorPointer ? boundObject.isCursorPointer : false;
		
						// If cursor pointer is to be applied
						if (isCursorPointer) {
								$(element).addClass('cursorPointer');
							}
		
						// Remove class if already exists
						if (element['__ko__previousClassValue__']) {
								$(element).removeClass(element['__ko__previousClassValue__']);
							}
		
						$(element).addClass(className);
						element['__ko__previousClassValue__'] = className;
					}
		};

		// <summary> Toggle expand collapse classes </summary>
		ko.bindingHandlers['expandCollapse'] = {
				update: function (element, valueAccessor, allValueAccessor, viewModel, bindingContext) {
		
						var value = ko.utils.unwrapObservable(valueAccessor());
		
						var currentElement = $(element);
						if (value !== null) {
								if (currentElement.hasClass('collapsed')) {
										currentElement.removeClass('collapsed').addClass('expanded');
									} else if (currentElement.hasClass('expanded')) {
											currentElement.removeClass('expanded').addClass('collapsed');
										}
							}
					}
		};

		// <summary> Allow/ Disallow bindings to descendants </summary>
		ko.bindingHandlers['allowBindings'] = {
				init: function (elem, valueAccessor) {
						// Let bindings proceed as normal *only if* my value is false
						var shouldAllowBindings = ko.unwrap(valueAccessor());
						return { controlsDescendantBindings: !shouldAllowBindings };
			}
		};

		// <summary> Update sort icons </summary>
		ko.bindingHandlers['updateSortIcons'] = {
				update: function (element, valueAccessor, allValueAccessor, bindingContext, viewModel) {
						var boundObject = ko.unwrap(valueAccessor()),
							columnName = boundObject.columnName.toLowerCase(),
							sortColumnName = ko.utils.unwrapObservable(boundObject.sortColumnName || viewModel.$parent.sortColumn).toLowerCase(),
							sortOrder = ko.utils.unwrapObservable(boundObject.sortOrder || viewModel.$parent.sortOrder).toLowerCase() || "asc",
							sortAscClass = 'sort-asc',
							sortDescClass = 'sort-desc';
		
						// Check 1: If sort column is same as current column
						if (!!columnName && !!sortColumnName && columnName === sortColumnName) {
			
								// Check 1: toggle the asc/ desc classes
								if (sortOrder.toLowerCase() === 'asc') {
										$(element).removeClass(sortAscClass).addClass(sortDescClass);
									} else {
									$(element).removeClass(sortDescClass).addClass(sortAscClass);
								}
						} else {
					$(element).removeClass(sortDescClass).removeClass(sortAscClass);
				}
			}
		};

		// <summary> Add text as well as label to element </summary>
		ko.bindingHandlers['textAndTitle'] = {
				update: function (element, valueAccessor) {
						var value = ko.unwrap(valueAccessor());
		
						if (!!value) {
								// Add text to element
								$(element).text(value);
								// Add title to element
								$(element).attr('title', value)
							}
					}
		};

		//#endregion

		//#region Custom observable extenders, utils and fn

		// <summary> Log change in value of observable to console </summary>
		ko.extenders['logChange'] = function (target, option) {
				target.subscribe(function (newValue) {
						console.log(option + ": " + newValue);
					});
	
				return target;
			};

		// <summary> Notify changed observable value always  </summary>
		ko.extenders['notify'] = function (target, notifyWhen) {
				target["equalityComparer"] = notifyWhen == "always"
					? function () { return false } // Treat all values as not equal
					: ko.observable["fn"]["equalityComparer"];
				return target;
			};

		// <summary> Extend observable arrays to provide sorting </summary>
		ko.observableArray.fn['sortByColumn'] = function (column, order) {
	
				// If order to be sorted is ascending
				if (!!order && order.toLowerCase() === 'asc') {
						this.sort(function (left, right) {
								return left[column] === right[column] ? 0 : left[column] > right[column] ? -1 : 1;
							});
					} else {
					this.sort(function (left, right) {
							return left[column] === right[column] ? 0 : left[column] < right[column] ? -1 : 1;
						});
				}
		}

		/// <summary> Extend observable array for merging 2 observable arrays</summary>
		ko.observableArray.fn['pushAll'] = function (valuesToPush) {
				var underlyingArray = this();
				this.valueWillMutate();
				ko.utils.arrayPushAll(underlyingArray, valuesToPush);
				this.valueHasMutated();
				return this;  //optional
			};

		//#endregion

		return this;
	};

	var koUtilities = new KnockoutUtilities();

	return koUtilities;
});