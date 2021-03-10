module.exports = function(environment) {
	var ENV = {
		modulePrefix: 'woc',
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
				host: 'https://worldofcrew.herokuapp.com',
				namespace: 'v1'
			}
		},

		googleLeaflet: {
			apiKey: 'AIzaSyAwVwNuMNmPh1PvHC0nSC0s5qenlGC-fbo'
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
