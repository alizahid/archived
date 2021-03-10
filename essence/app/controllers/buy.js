import Ember from 'ember';

export default Ember.Controller.extend({
	storage: Ember.inject.service(),

	gas: {
		spg5: {
			type: 'spg5',
			quantity: 0,
		},
		spg8: {
			type: 'spg8',
			quantity: 0,
		},
		diesel: {
			type: 'diesel',
			quantity: 0,
		}
	},

	actions: {
		save() {
			['spg5', 'spg8', 'diesel'].forEach((item) => {
				Ember.set(this, 'gas.' + item + '.quantity', parseFloat(this.gas[item].quantity));
			});

			this.get('storage').put('buy', this.gas);
		}
	}
});
