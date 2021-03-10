import Ember from 'ember';

export default Ember.Controller.extend({
	api: Ember.inject.service(),
	storage: Ember.inject.service(),

	actions: {
		login() {
			if (this.email && this.password) {
				this.set('error', null);

				this.get('api').POST('/users/login', {
					email: this.email,
					password: this.password
				}).then((data) => {
					this.get('storage').put('user', data.user).put('token', data.token);

					this.store.findRecord('user', data.user).then(() => {
						this.transitionToRoute('index');
					});
				}, (error) => {
					this.set('error', error);
				});
			}
		}
	}
});
