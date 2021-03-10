import Ember from 'ember';

export default Ember.Route.extend({
	titleToken: 'Buy',

	storage: Ember.inject.service(),

	setupController(controller) {
		let data = this.get('storage').get('buy') || {};

		['spg5', 'spg8', 'diesel'].forEach((item) => {
			let gas = data[item] || {};

			if (gas.quantity > 0) {
				controller.set('gas.' + item + '.quantity', gas.quantity);
			}
		});
	}
});
