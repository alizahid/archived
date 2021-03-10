/* jshint node: true */

/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
	var app = new EmberApp(defaults, {
		storeConfigInMeta: false,
	});

	app.import('vendor/unsemantic/unsemantic-grid-responsive.css');

	return app.toTree();
};
