import Ember from 'ember';

export default Ember.Route.extend({
	storage: Ember.inject.service(),

	model() {
		let user = this.get('storage').get('user');

		return this.get('store').peekRecord('user', user);
	}
});
