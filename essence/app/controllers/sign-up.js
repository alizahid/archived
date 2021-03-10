import Ember from 'ember';

export default Ember.Controller.extend({
	api: Ember.inject.service(),
	storage: Ember.inject.service(),

	actions: {
		signUp() {
			if (this.name && this.email && this.password) {
				this.set('error', null);

				this.get('api').POST('/users', {
					name: this.name,
					email: this.email,
					password: this.password
				}).then((data) => {
					this.get('storage').put('user', data.user).put('token', data.token);

					this.transitionToRoute('index');
				}, (error) => {
					this.set('error', error);
				});
			}
		}
	}
});
