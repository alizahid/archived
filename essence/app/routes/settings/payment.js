import Ember from 'ember';

export default Ember.Route.extend({
	titleToken: 'Payment',

	api: Ember.inject.service(),

	model() {
		let id = this.get('api').id();

		return this.store.findRecord('payment', id);
	},
	setupController(controller, model) {
		this._super(...arguments);

		controller.setProperties({
			working: false,
			card: null,
			error: null,
			showCard: !model.get('token'),
		});
	}
});
