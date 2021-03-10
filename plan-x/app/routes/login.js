import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service('session'),

	beforeModel: function () {
		if (this.get('session').isLoggedIn()) {
			this.replaceWith('index');
		}
	},
	setupController: function (controller) {
		controller.setProperties({
			email: null,
			password: null,
			error: null,
			disabled: null
		});
	}
});
