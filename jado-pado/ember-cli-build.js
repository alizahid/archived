/* jshint node: true */
/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
	var app = new EmberApp(defaults, {
		autoprefixer: {
			browsers: ['last 2 version'],
			cascade: false
		}
	});

	app.import('bower_components/trianglify/dist/trianglify.min.js');

	app.import('vendor/dialogs/dialogs.js');
	app.import('vendor/dialogs/dialogs.css');

	return app.toTree();
};
