import Ember from 'ember';

export default Ember.Controller.extend({
	api: Ember.inject.service(),

	actions: {
		save() {
			if (this.password && this.newPassword) {
				this.setProperties({
					error: null,
					message: null,
				});

				this.get('api').POST('/users/password', {
					password: this.password,
					newPassword: this.newPassword,
				}).then(() => {
					this.setProperties({
						message: 'Password updated',
						password: null,
						newPassword: null,
					});
				}, (error) => {
					this.set('error', error);
				});
			}
		}
	}
});
