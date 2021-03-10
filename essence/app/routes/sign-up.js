import Ember from 'ember';

export default Ember.Route.extend({
	titleToken: 'Sign up',

	setupController(controller) {
		controller.setProperties({
			name: null,
			email: null,
			password: null,
			message: null,
			error: null,
		});
	}
});
