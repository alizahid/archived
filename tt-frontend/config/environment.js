/* jshint node: true */

module.exports = function(environment) {
	var ENV = {
		modulePrefix: 'frontend',
		environment: environment,
		defaultlocationType: 'auto',
		EmberENV: {
			FEATURES: {}
		},

		APP: {
			apiEndPoint: 'https://obscure-retreat-93820.herokuapp.com'
		}
	};

	if (environment === 'development') {}

	if (environment === 'test') {
		ENV.baseURL = '/';
		ENV.locationType = 'none';

		ENV.APP.LOG_ACTIVE_GENERATION = false;
		ENV.APP.LOG_VIEW_LOOKUPS = false;

		ENV.APP.rootElement = '#ember-testing';
	}

	if (environment === 'production') {}

	return ENV;
};
