import Ember from 'ember';

export default Ember.Controller.extend({
	gas: [{
		type: 'spg5',
		quantity: 0,
		price: 0
	}, {
		type: 'spg8',
		quantity: 0,
		price: 0
	}, {
		type: 'diesel',
		quantity: 0,
		price: 0
	}],

	actions: {
		save() {
			let model = this.get('model');

			model.set('gas', this.gas);

			model.save();
		}
	}
});
