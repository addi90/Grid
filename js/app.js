// Define the initial configuration for App 

/**
	@param: null,
	@returns: initial configuration
*/

require.config({
	baseUrl: "js",
	paths: {
		"jquery": [
			"http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
			"vendor/require-jquery"
		],
		"knockout": [
			"http://ajax.aspnetcdn.com/ajax/knockout/knockout-2.2.1",
			"vendor/knockout-3.0.0"
		],
		"bootstrap": [
			"https://netdna.bootstrapcdn.com/bootstrap/3.0.2/js/bootstrap.min",
			"vendor/bootstrap"
		],
		"template": 'modules',
		"vendor": 'vendor',
		"styles": '../css'
	},
	shim: {
		"knockout.mapping-latest": {
			deps: ['knockout']
			}
	}
});

// Define the startup template as require
require(['vendor/knockout-3.0.0', '../gridConsumer'], function (ko, gridViewModel) {
	ko.applyBindings(gridViewModel);
});
	