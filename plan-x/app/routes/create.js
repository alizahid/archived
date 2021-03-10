import Ember from 'ember';

export default Ember.Route.extend({
	setupController: function (controller) {
		controller.setProperties({
			description: null,
			when: null,
			where: null,
			tags: null
		});
	}
});
