var EmberApp = require('ember-cli/lib/broccoli/ember-app')

module.exports = function(defaults) {
	var app = new EmberApp(defaults, {
		autoprefixer: {
			browsers: [
				'> 1%',
				'last 2 versions',
				'ChromeAndroid > 1',
				'iOS > 1',
			],
			cascade: false
		},
		fingerprint: {
			exclude: [
				'images/layers-2x.png',
				'images/layers.png',
				'images/marker-icon-2x.png',
				'images/marker-icon.png',
				'images/marker-shadow.png'
			]
		}
	})

	return app.toTree()
}
