import Ember from 'ember';

export default Ember.Route.extend({
	titleToken: 'Sell',

	api: Ember.inject.service(),

	model() {
		return this.get('api').user();
	},
	setupController(controller, model) {
		this._super(...arguments);

		if (model.get('gas')) {
			model.get('gas').forEach((item) => {
				console.log(item);
				let gas = controller.get('gas').findBy('type', item.type);

				if (item.quantity > 0) {
					Ember.set(gas, 'quantity', item.quantity);
				}

				if (item.price > 0) {
					Ember.set(gas, 'price', item.price);
				}
			});
		}
	},

	deactivate() {
		this.get('controller').get('gas').forEach((item) => {
			Ember.setProperties(item, {
				quantity: 0,
				price: 0,
			});
		});
	}
});
