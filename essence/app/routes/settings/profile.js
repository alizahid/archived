import Ember from 'ember';

export default Ember.Route.extend({
	titleToken: 'Profile',

	api: Ember.inject.service(),

	model() {
		return this.get('api').user();
	},
	setupController(controller) {
		this._super(...arguments);

		controller.setProperties({
			locating: false,
			area: null,
		});
	}
});
