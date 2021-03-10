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
		}
	})

	app.import('bower_components/trianglify/dist/trianglify.min.js')

	return app.toTree()
}
