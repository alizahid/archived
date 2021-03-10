import Ember from 'ember';

export default Ember.Route.extend({
	titleToken: 'Reset password',

	setupController(controller) {
		controller.setProperties({
			email: null,
			error: null,
		});
	}
});
