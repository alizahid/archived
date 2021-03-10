import Ember from 'ember';

export default Ember.Controller.extend({
	ajax: Ember.inject.service(),
	auth: Ember.inject.service(),
	storage: Ember.inject.service(),

	actions: {
		verify() {
			if (this.token) {
				this.set('error', null);

				this.get('ajax').post('/sessions/verify', {
					token: this.token
				}, {
					token: this.get('auth').getToken()
				}).then(data => {
					this.get('storage').put('user', data.user).put('token', data.token);

					this.get('store').findRecord('user', data.user).then(() => {
						this.setProperties({
							error: null,
							token: null
						});

						this.transitionToRoute('index');
					});
				}, err => {
					this.set('error', err);
				});
			}
		}
	}
});
