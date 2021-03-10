/* jshint node: true */

module.exports = function(environment) {
	var ENV = {
		modulePrefix: 'essence',
		environment: environment,
		defaultLocationType: 'auto',
		EmberENV: {
			FEATURES: {}
		},

		APP: {
			apiEndPoint: 'http://localhost:3000',
			mapBoxAccessToken: 'pk.eyJ1IjoiYWxpemFoaWQiLCJhIjoiY2luM3BkZWVlMDBxbHZxbTJveHF5anc1MyJ9.9_MNIINyhFTJLYee-EFz9Q',
			geocodingApiKey: 'AIzaSyBdvY9tf5Vl283fQqt60OtI3H0jJHlSQX4',
			premiumPrice: 5,
		},
	};

	if (environment === 'development') {}

	if (environment === 'test') {
		ENV.baseURL = '/';
		ENV.locationType = 'none';

		ENV.APP.LOG_ACTIVE_GENERATION = false;
		ENV.APP.LOG_VIEW_LOOKUPS = false;

		ENV.APP.rootElement = '#ember-testing';
	}

	if (environment === 'production') {
		ENV.APP.apiEndPoint = 'https://sos-essence.herokuapp.com';
	}

	return ENV;
};
