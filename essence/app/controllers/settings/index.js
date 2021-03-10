import Ember from 'ember';

export default Ember.Controller.extend({
	storage: Ember.inject.service(),

	actions: {
		logout() {
			this.get('storage').remove('user').remove('token');

			this.transitionToRoute('login');
		}
	}
});
