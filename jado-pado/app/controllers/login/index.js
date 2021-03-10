import Ember from 'ember';

export default Ember.Controller.extend({
	ajax: Ember.inject.service(),
	auth: Ember.inject.service(),
	storage: Ember.inject.service(),

	actions: {
		login() {
			if (this.email && this.password) {
				this.set('error', null);

				this.get('ajax').post('/sessions', {
					email: this.email,
					password: this.password
				}).then(data => {
					if (data.twoFactor) {
						this.get('auth').setToken(data.token);

						this.transitionToRoute('login.verify');
					} else {
						this.get('storage').put('user', data.user).put('token', data.token);

						this.get('store').findRecord('user', data.user).then(() => {
							this.setProperties({
								error: null,
								email: null,
								password: null
							});

							this.transitionToRoute('index');
						});
					}
				}, err => {
					this.set('error', err);
				});
			}
		}
	}
});
