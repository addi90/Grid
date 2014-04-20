// Common utility methods
define([
	"http://ajax.aspnetcdn.com/ajax/knockout/knockout-2.2.1.js",
	"vendor/jquery-1.10.2.min"
	],
function(
	ko,
	$){
	"use strict";
	
	/**
	* Mention method description
	* @param: null
	* @returns: 
	* <summary> Other details </summary>
	*/
	function viewModel() {

		var self = this;

		// A flag to set if we need to use logging, by default it is on, all logging functions can be disabled by this 
		self.UseLog = true;

		// Set if log values are visible on page or not
		self.ShowLogOnPage = false;

		//#region Objects
		
		//#endregion Objects
				
		//#region methods
		
		/**
		* Check if input vriable is not undefined
		* @param: oInputValue
		* @returns: Return true if input is safe(not undefined) else false
		*/
		self.isSafe = function(inputToCheck){
			return !!inputToCheck;
		};
				
		/**
		* Return key count in object if object else 0
		* @param: oInputValue
		* @returns: Return count of keys in object if input is object else 0
		*/
		self.getKeyCountObject = function(oInputValue){
			var keyCount = 0, keyCounter;
			
			if(self.isSafe(oInputValue) && typeof oInputValue === 'object'){
								
				for(keyCounter in oInputValue){
					oInputValue.hasOwnProperty(keyCounter) && keyCount++;
				}
								
			}
			return keyCount;
		};
		
		/**
		* Check if input is an empty object
		* @param: oInputValue
		* @returns: Return true if input is empty object else false
		*/
		self.isEmptyObject = function(oInputValue){
			if(getKeyCountObject(oInputValue) === 0){				
				return false;
			}
			
			return true;
		};
		
		/**
		* Private property to hold all objects type
		*/
		var oType = {};
		(function () {
			var _oJSObjects = "Boolean Number String Function Array Date RegExp Object NodeList".split(" "), index = 0;
			for (; index < _oJSObjects.length; index++) {
				oType["[object " + _oJSObjects[index] + "]"] = _oJSObjects[index].toLowerCase();
			}
		})();
	
		/**
		* Public method to get the type of object
		* @param: oInputValue
		* @returns: Return type of input
		*/
		self.getType = function (oInputValue) {
			// Passed parameter may be blank string or Boolean value false, so we cannot use if(oInputValue) to check for false condition
			if (oInputValue === null) {
				return "null";
			}
			return oType[Object.prototype.toString.call(oInputValue)] || "object";
		};
		
		/**
		* Check if input is array
		* @param: oInputValue
		* @returns: Return true if input is array else false
		*/
		self.isArray = function(oInputValue){
			return self.getType(oInputValue) === 'array';
		};
					
		/** 
		* Checks if a value is string
		* @param: oInputValue
		* @returns: Return true if input is string else false
		*/
		self.isString = function (oInputValue) {
			return (typeof oInputValue === 'string' || oInputValue instanceof String);
		};
			
		/** 
		* Checks if a value is Boolean
		* @param: oInputValue
		* @returns: Return true if input is boolean else false
		*/
		self.isBoolean = function (oInputValue) {
			return self.getType(oInputValue) === "boolean";
		};
		
		/**
		* Checks if variable passed is an strict object
		* @param: oInputValue
		* @returns: Return true if input is object else false
		*/
		self.isObject = function (oInputValue) {
			return self.getType(oInputValue) === "object";
		};
		
		/**
		* Checks if variable passed is a function
		* @param: oInputValue
		* @returns: Return true if input is function else false
		*/
		self.isFunction = function (oInputValue) {
			return self.getType(oInputValue) === "function";
		};
		
		/**
		* Checks if variable passed is an integer
		* @param: oInputValue
		* @returns: Return true if input is integer else false
		*/
		self.isInteger = function (oInputValue) {
			return self.getType(oInputValue) === "number";
		};
		
		/**
		* Checks if variable passed is a date object
		* @param: oInputValue
		* @returns: Return true if input is date else false
		*/
		self.isDate = function (oInputValue) {
			return self.getType(oInputValue) === "date";
		};
		
		/**
		* Checks if variable passed is a node list
		* @param: oInputValue
		* @returns: Return true if node list
		*/
		self.isNodeList = function (oInputValue) {
			return self.getType(oInputValue) === "nodelist";
		};
				
		/** 
		* Trim string method
		* @param: oInputValue
		* @returns: trimmed string
		*/
		self.trim = function (sValue) {
			if (!self.isString(sValue)) {
				return sValue;
			}

			if (typeof String.prototype.trim !== 'function') {
				return sValue.replace(/^\s+|\s+$/g, '');
			}
			return sValue.trim();
		};

		/**
		* Check if a given string can be used as number (only unsigned integers)
		* @param: oInputValue
		* @returns: return true if number else false
		*/
		self.isNumber = function (oInputValue) {
			if (self.isSafe(oInputValue)) {
				return (/^\d+$/.test(oInputValue));
			}
			return false;
		};

		/** 
		* Check if a given value is signed integer or signed decimal
		* @param: oInputValue
		* @returns: return true if decimal else false
		*/
		self.isDecimal = function (oInputValue) {
			if (self.isSafe(oInputValue)) {
				return (/^[+-]?\d+(\.\d+)?$/.test(oInputValue));
			}
		};

		/** 
		* Check if a given value is signed integer or signed decimal
		* @param: sFirstValue, sSecondValue
		* @returns: return true if the 2 input strings are equal after trimmed else false
		*/
		self.equalTrim = function (sFirstValue, sSecondValue) {
			return self.isString(sFirstValue) && self.isString(sSecondValue) && self.trim(sFirstValue) === self.trim(sSecondValue);
		};

		/**
		* Return
		*	no of keys : For input object
		*	no of elements: For input array
		* 	string length: For input string
		*	0: in all other cases
		*/
		self.getLength = function(oInputValue, isTrim){
			
			// Check if a valid object
			if (self.isSafe(oInputValue)) {
			
				// if array then return length
				if (self.isArray(oInputValue)) {
					return oInputValue.length;
				}

				// If string then trim and then return length
				if (self.isString(oInputValue)) {
					return (self.isSafe(IsTrim) && isTrim === true) ? self.trim(oInputValue).length : oInputValue.length;
				}
				
				// if object
				if (self.isObject(oInputValue)) {
					return self.getKeyCountObject(oInputValue);
				}
			}
			return 0;
		};
		
		/** 
		* Join an Object key value pairs
		* @param: oInputValue, keyGlue, pairGlue
		* @returns: return object as key value pair
		*/
		self.joinKeyValuePairs = function (oInputValue, keyGlue, pairGlue) {
			if (self.isObject(oInputValue)) {
				var joinString = '', key;

				for (key in oInputValue) {
					if (oInputValue.hasOwnProperty(key)) {
						if (joinString === '') {
							joinString = key + keyGlue + oInputValue[key];
						}
						else {
							joinString = joinString + pairGlue + key + keyGlue + oInputValue[key];
						}
					}
				}
				return joinString;
			}

			// If an array join with keyGlue
			if (self.isArray(oInputValue)) {
				return oInputValue.join(keyGlue);
			}

			// If an string return as it is
			if (self.isString(oInputValue)) {
				return oInputValue;
			}
		};

		/**
		* Join an object to string form with quotes around values
		* @param: oInputObject, keyGlue, pairGlue
		* @returns: return string for given object
		*/
		self.joinKeyValuePairWithQuotes = function (oInputObject, keyGlue, pairGlue) {
			var stringTemplate = '{ initialTemplate }',
				stringifiedObject = '';

			for (var key in oInputObject) {
				if (oInputObject.hasOwnProperty(key)) {
					if (stringifiedObject === '') {
						stringifiedObject = key + keyGlue + '&apos;' + oInputObject[key] + '&apos;';
					} else {
						stringifiedObject = stringifiedObject + pairGlue + key + keyGlue + '&apos;' + oInputObject[key] + '&apos;';
					}
				}
			}

			stringTemplate = stringTemplate.replace('initialTemplate', stringifiedObject);
			
			return stringTemplate;
		};

		/** 
		* Returns a cloned copy of object, 
		* Doesn't support Deep Copy
		* Clean this approach to use a deep copy by calling recursive function
		* Use some smart technique to avoid Deep copying DOM elements
		* @param: oInputValue
		* @returns: return cloned object as key value pair
		*/
		self.clone = function (oInputValue) {
			// Handle the 3 simple types, and null or undefined
			if (null === oInputValue || "object" !== typeof oInputValue) {
				return oInputValue;
			}

			// Handle Date
			if (self.isDate(oInputValue)) {
				var copy = new Date();
				copy.setTime(oInputValue.getTime());
				return copy;
			}

			// Handle Array
			if (self.isArray(oInputValue)) {
				var copy = [];
				for (var index = 0, length = oInputValue.length; index < length; ++index) {
					copy[index] = self.clone(oInputValue[index]);
				}
				return copy;
			}

			// Handle Object
			if (self.isObject(oInputValue)) {
				var copy = {};
				for (var attr in oInputValue) {
					if (oInputValue.hasOwnProperty(attr)) {
						copy[attr] = self.clone(oInputValue[attr]);
					}
				}
				return copy;
			}

			throw new Error("Unable to copy object! Its type isn't supported.");
		};

		/** 
		* Join JSON pair with some keys to skip, takes only one dimensional array of strings as keys to skip
		* @param: oInputValue, keyGlue, pairGlue, oSkipKey
		* @returns: return JSON object
		*/
		self.joinJSON = function (oInputValue, keyGlue, pairGlue, oSkipKey) {
			var oClonedValue = self.clone(oInputValue);

			if (self.isSafe(oSkipKey)) {
				// If array of string keys, then delete keys from object and then pass to join key value pair function

				if (self.isArray(oSkipKey)) {
					for (var index = 0; index < oSkipKey.length; index++) {
						if (self.isString(oSkipKey[index]) && oClonedValue.hasOwnProperty(oSkipKey[index])) {
							delete oClonedValue[oSkipKey[index]];
						}
					}
				}
				else if (self.isString(oSkipKey) && oClonedValue.hasOwnProperty(oSkipKey)) {
					delete oClonedValue[oSkipKey];
				}
			}
			return self.joinKeyValuePairs(oClonedValue, keyGlue, pairGlue);
		};

		/** 
		* Search a value in an array
		* @param: sNeedle, oInputValue, FnComparison
		* @returns: return index of element in array
		*/
		self.getIndex = function (sNeedle, oInputValue, FnComparison) {
			if (!self.isSafe(oInputValue)) {
				return -1;
			}
			if (self.isArray(oInputValue)) {
				var i = 0, index = -1;
				for (; i < oInputValue.length; i++) {
					var bEqualResult = false;

					if (self.isFunction(FnComparison)) {
						bEqualResult = FnComparison(oInputValue[i], sNeedle);
					}
					else {
						bEqualResult = (oInputValue[i] === sNeedle);
					}
					if (bEqualResult) {
						index = i;
						break;
					}
				}
				return index;
			}
			// if string then return index of character or string
			if (self.isString(oInputValue)) {
				return oInputValue.indexOf(sNeedle);
			}

			if (self.isObject(oInputValue)) {
				return oInputValue.hasOwnProperty(sNeedle) === true ? 0 : -1;
			}
		};

		/** 
		* Check if given object is valid JSON object or not
		* @param: sNeedle, oInputValue, FnComparison
		* @returns: return result true with valid JSON else return false with exception
		*/
		self.isValidJSON = function (oInputValue) {
			try {
				oInputValue = ko.toJSON(oInputValue);
				// We can return from here parsed JSON to save time to convert to valid JSON if already Valid
				return { "result": self.isObject(oInputValue), "validJSON": oInputValue };
			}
			catch (InvalidJSONException) {
				return { "result": false, "Exception": InvalidJSONException };
			}
		};

		/** 
		* Log activities to console
		* @param: sNeedsValuele
		* @returns: log values to console
		*/
		self.log = function (sValue) {
			if (self.UseLog) {
				console.log(ko.toJSON(sValue, null, 2));
			}
		};


		///TODO: Add functions for:
		// 1. Format number, date and currenncies
		// 2. Walk through an array and call filter or modify methods
		// 3. Remove CRLF
		// 4. Cache handling, session storage
		// 5. Format query parameters

		/** 
		* Split a given string with additional options with split string
		* @param: sValue, sSeparator, oSplitOptions
		* @returns: split array 
		*/
		self.splitString = function (sValue, sSeparator, oSplitOptions) {
			if (self.isSafe(sValue) && self.isString(sValue)) {
				// TODO: change this implementation to use regular expression to split by using replace method with callback option
				var aValue = sValue.split(sSeparator);

				if (self.isFunction(oSplitOptions)) {
					aValue = oSplitOptions(aValue);
				}
				return aValue;
			}
			return []; // return empty array if undefined, false, null or empty string is passed
		};

	   /** 
	   * Check if a path exists in JSON or not, 
	   * @param: sPath, oInputValue
	   * @returns: an object with true or false result and value node with path value if exists
	   */
		self.isPathExist = function (sPath, oInputValue) {
			// Check if values are string and JSON objects
			if (self.isString(sPath) && self.isObject(oInputValue)) {
				var aKeys = self.splitString(sPath, ".", utilObject.StringSplitOptions.Trim), key, oFinalPathVal = null;
				for (key in aKeys) {
					var sKey = aKeys[key];

					if (oInputValue.hasOwnProperty(sKey)) {
						oInputValue = oInputValue[sKey];
					}
					else {
						return { "result": false, "value": null };
					}
				}
				return { "result": true, "value": oInputValue };
			}
			return { "result": false, "value": null };
		};

		/** 
		* Get GUID unique number
		* @param: null
		* @returns: unique number
		*/
		self.getUniqueNumber = function () {
			// http://www.ietf.org/rfc/rfc4122.txt
			var s = new Array(36);

			var hexDigits = "0123456789abcdef";

			for (var index = 0; index < 36; index++) {
				s[index] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
			}

			s[14] = "4";  
			s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  
			s[8] = s[13] = s[18] = s[23] = "-";

			var uuid = s.join("");
			return uuid;
		};

		/** 
		* Find the parent with given node name
		* @param: oDomElement, sNodeName
		* @returns: parent with given node name, else immediate parent if no name is specified
		*/
		self.parent = function (oDomElement, sNodeName) {

			if (self.isSafe(oDomElement) && self.isSafe(oDomElement.tagName)) {
				if (!self.isSafe(sNodeName) || !self.isString(sNodeName)) {
					return oDomElement.parentNode;
				}
				var oParent = oDomElement.parentNode;

				while (self.isSafe(oParent) && oParent.tagName !== sNodeName) {
					oParent = oParent.parentNode;
				}
				return oParent;
			}
			return null;
		};

		/** 
		* Find the match column
		* @param: aColumns, sKeyName, sKeyValue
		* @returns: matching column
		*/
		self.getMatchColumn = function (aColumns, sKeyName, sKeyValue) {
			for (var columnCounter = 0; columnCounter < aColumns.length; columnCounter++) {
				var oColumn = aColumns[columnCounter];
				for (var sKey in oColumn) {
					if (oColumn.hasOwnProperty(sKey) && oColumn[sKey] === sKeyValue) {
						return oColumn;
					}
				}
			}
			return null;
		}

		/** 
		* Check if input is negative
		* @param: sValue
		* @returns: true if negative else false
		*/
		self.isNegative = function (sValue) {
			return ((sValue + "").indexOf("-") === 0);
		};

		/** 
		* Slice input array based on page size and current page
		* @param: aData, iCurrentPage, iPageSize
		* @returns: sliced array
		*/
		self.slicePageData = function (aData, iCurrentPage, iPageSize) {
			var startIndex = 0,
				endIndex = 0;

			startIndex = ((iCurrentPage - 1) * iPageSize);
			endIndex = iCurrentPage * iPageSize;

			return aData.slice(startIndex, endIndex);
		}

		/**
		* Create table using basic jquery 
		* @param tableConfiguration
		* @returns HTML for table
		*/
		self.generateTable = function (tableConfiguration) {

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

		//#endregion methods

		return this;
	};
	
	/// <summary> Instantiate viewModel </summary>
	var vm = new viewModel();
	
	return vm;
	
});