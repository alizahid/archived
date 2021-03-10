import Ember from 'ember';

export default Ember.Route.extend({
	auth: Ember.inject.service(),

	beforeModel() {
		let token = this.get('auth').getToken();

		if (!token) {
			this.replaceWith('login');
		}
	}
});
