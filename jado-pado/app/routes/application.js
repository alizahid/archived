import Ember from 'ember';

export default Ember.Route.extend({
	storage: Ember.inject.service(),

	beforeModel() {
		let user = this.get('storage').get('user');

		if (user) {
			return this.get('store').findRecord('user', user);
		}
	}
});
