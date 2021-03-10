module.exports = function(environment) {
	var ENV = {
		modulePrefix: 'crew-untold',
		environment: environment,
		locationType: 'hash',
		EmberENV: {
			FEATURES: {},
			EXTEND_PROTOTYPES: {
				Date: false
			}
		},

		APP: {
			api: {
				host: 'https://api.crewuntold.com',
				namespace: 'v1'
			}
		},

		pace: {
			color: 'white'
		},

		analytics: {
			integrations: [{
				name: 'Facebook',
				config: {
					id: '707430912762126'
				}
			}, {
				name: 'GoogleAnalytics',
				config: {
					id: 'UA-61539424-14'
				}
			}]
		}
	}

	if (environment === 'development') {
		ENV.APP.api.host = 'http://localhost:3000'
	}

	if (environment === 'test') {
		ENV.locationType = 'none'

		ENV.APP.LOG_ACTIVE_GENERATION = false
		ENV.APP.LOG_VIEW_LOOKUPS = false

		ENV.APP.rootElement = '#ember-testing'
	}

	if (environment === 'production') {}

	return ENV
}
