import Ember from 'ember';

export default Ember.Route.extend({
	title(tokens) {
		return tokens.reverse().join(' - ') + ' - Essence';
	},

	api: Ember.inject.service(),

	model() {
		const api = this.get('api');

		if (api.auth()) {
			let id = api.id();

			return this.store.findRecord('user', id);
		}
	}
});
