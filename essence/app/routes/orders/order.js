import Ember from 'ember';

export default Ember.Route.extend({
	titleToken: 'Order',

	model(params) {
		return this.store.findRecord('order', params.id);
	},
	setupController(controller, model) {
		model.get('items').forEach((item) => {
			Ember.set(item, 'total', item.quantity * item.price);
		});

		this._super(...arguments);

		this.set('titleToken', 'Order ' + model.id);

		controller.setProperties({
			working: false,
		});
	}
});
