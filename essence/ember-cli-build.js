/* jshint node: true */
/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
	var app = new EmberApp(defaults, {
		storeConfigInMeta: false,
		fingerprint: {
			exclude: [
				'images/layers-2x.png',
				'images/layers.png',
				'images/marker-icon-2x.png',
				'images/marker-icon.png',
				'images/marker-shadow.png',
				'assets'
			]
		},
		autoprefixer: {
			browsers: ['> 1%']
		}
	});

	app.import('bower_components/jquery.payment/lib/jquery.payment.min.js');

	app.import('bower_components/nprogress/nprogress.js');
	app.import('bower_components/nprogress/nprogress.css');

	return app.toTree();
};
