import Ember from 'ember';

export default Ember.Route.extend({
	titleToken: 'Orders',

	model() {
		return this.store.findAll('order');
	}
});
