import Ember from 'ember';

export default Ember.Route.extend({
	setupController(controller) {
		controller.setProperties({
			working: false,
			error: null,
			message: null,
			password: null,
			newPassword: null,
		});
	}
});
