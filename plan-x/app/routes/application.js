import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service('session'),
	storage: Ember.inject.service('storage'),
	push: Ember.inject.service('push'),
	api: Ember.inject.service('api'),

	beforeModel: function () {
		$('body').removeClass('loading');

		try {
			navigator.analytics.set('userId', JSON.parse(localStorage.planx_user));
		} catch (ex) {}

		if (this.get('session').isLoggedIn()) {
			var id = this.get('session').getUser();

			var self = this;

			this.get('push').register(function (token) {
				var oldToken = self.get('storage').get('pushToken');

				if (oldToken !== token) {
					self.get('storage').put('pushToken', token);

					try {
						self.get('push').register(function (token) {
							$.ajax({
								url: 'https://plan-x.herokuapp.com/v1/users/' + id,
								method: 'PUT',
								data: {
									device: {
										type: device.platform.toLowerCase(),
										token: token
									}
								},
								headers: {
									token: self.get('storage').get('token')
								}
							});
						});
					} catch (ex) {}
				}
			});

			return this.get('store').findRecord('user', id);
		}
	},
	actions: {
		error: function (error, transition) {
			var response = error.errors.pop();

			this.get('api').analytics.error(response.title, true);

			this.controllerFor('application-error').set('transition', transition);

			if (response.status === '403') {
				localStorage.clear();

				return this.transitionTo('choose');
			}

			return true;
		}
	}
});
