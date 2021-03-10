import Ember from 'ember';

export default Ember.Route.extend({
	titleToken: 'User',

	api: Ember.inject.service(),

	beforeModel(transition) {
		let user = this.get('api').user();

		if (!user.get('premium')) {
			transition.abort();

			this.replaceWith('index');
		}
	},
	model(params) {
		return this.store.findRecord('seller', params.id);
	},
	setupController(controller, model) {
		this._super(...arguments);

		this.set('titleToken', 'Buy gas from ' + model.get('name'));

		controller.setProperties({
			working: false,
			error: null,
		});
	}
});
