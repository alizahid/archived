/*jshint node:true*/

/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
	var app = new EmberApp(defaults, {
		storeConfigInMeta: false,
		fingerprint: {
			enabled: false
		},
		autoprefixer: {
			browsers: ['ChromeAndroid >= 1', 'iOS >= 1', 'Android >= 1']
		}
	});

	app.import('bower_components/hammerjs/hammer.js');
	app.import('bower_components/ember-hammer/ember-hammer.js');

	return app.toTree();
};
