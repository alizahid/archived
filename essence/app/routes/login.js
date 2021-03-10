import Ember from 'ember';

export default Ember.Route.extend({
	titleToken: 'Login',

	setupController(controller) {
		controller.setProperties({
			email: null,
			password: null,
			error: null,
		});
	}
});
