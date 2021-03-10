import Ember from 'ember';

export default Ember.Controller.extend(Ember.Evented, {
	session: Ember.inject.service('session'),
	storage: Ember.inject.service('storage'),
	api: Ember.inject.service('api'),

	actions: {
		reload: function () {
			this.get('target.router').refresh();
		},
		createPlan: function () {
			this.transitionToRoute('create');
		},
		rateApp: function () {
			try {
				AppRate.promptForRating(true);

				this.get('api').analytics.appRate();
			} catch (ex) {}
		},
		shareApp: function () {
			try {
				window.plugins.socialsharing.share('Check out Plan X, the app to find exclusive parties', 'Plan X', null, 'https://planx.me');

				this.get('api').analytics.appShare();
			} catch (ex) {}
		},
		logout: function () {
			this.get('session').logout();

			this.get('store').unloadAll();

			this.transitionToRoute('choose');

			this.get('api').analytics.logout();
		}
	}
});
