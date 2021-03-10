import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service('session'),
	api: Ember.inject.service('api'),

	actions: {
		login: function () {
			if (this.email && this.password) {
				this.setProperties({
					error: null,
					disabled: true
				});

				var self = this;

				this.get('session').login(this.email, this.password).then(function () {
					self.store.findRecord('user', self.get('session').getUser()).then(function () {
						self.transitionToRoute('index');
					});

					self.get('api').analytics.login();
				}, function (xhr) {
					var message = 'Something happened. Please try again.';

					if (xhr.status === 404) {
						message = 'Invalid email.';
					} else if (xhr.status === 401) {
						message = 'Invalid password.';
					}

					self.set('error', message);
				}).always(function () {
					self.set('disabled', null);
				});
			}
		}
	}
});
