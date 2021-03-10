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
			user: Ember.Object.create(),
			currentStep: 1,
			error: null,
			disabled: null
		});
	}
});
