/* jshint node: true */

module.exports = function(environment) {
	var ENV = {
		modulePrefix: 'jado-pado',
		environment: environment,
		rootURL: '/',
		locationType: 'auto',
		EmberENV: {
			FEATURES: {}
		},

		APP: {
			apiEndPoint: 'https://jado-pado-api.herokuapp.com'
		},

		pace: {
			theme: 'flash',
			color: 'pink'
		}
	};

	if (environment === 'development') {
		ENV.APP.apiEndPoint = 'http://localhost:3000';
	}

	if (environment === 'test') {
		ENV.locationType = 'none';

		ENV.APP.LOG_ACTIVE_GENERATION = false;
		ENV.APP.LOG_VIEW_LOOKUPS = false;

		ENV.APP.rootElement = '#ember-testing';
	}

	if (environment === 'production') {}

	return ENV;
};
