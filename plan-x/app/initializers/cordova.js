export default {
	name: 'cordova',
	initialize: function (app) {
		app.deferReadiness();

		app.inject('service', 'router', 'router:main');
		app.inject('component', 'router', 'router:main');

		document.addEventListener('deviceready', function () {
			try {
				AppRate.preferences.storeAppURL.ios = '123123123';
				AppRate.preferences.storeAppURL.android = 'market://details?id=me.planx';

				AppRate.preferences.customLocale = {
					title: 'Rate Plan X',
					message: 'If you enjoyed using Plan X, please take a moment to rate the app. Thanks!',
					cancelButtonLabel: 'No, thanks',
					laterButtonLabel: 'Remind me later',
					rateButtonLabel: 'Rate it now'
				};
			} catch (ex) {}

			try {
				navigator.analytics.setTrackingId('UA-70151814-2');
			} catch (ex) {}

			app.advanceReadiness();
		}, false);
	}
};
