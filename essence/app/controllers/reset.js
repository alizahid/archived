import Ember from 'ember';

export default Ember.Controller.extend({
	api: Ember.inject.service(),

	actions: {
		reset() {
			if (this.email) {
				this.setProperties({
					error: null,
					message: null,
				});

				this.get('api').POST('/users/reset', {
					email: this.email,
				}).then((data) => {
					this.setProperties({
						email: null,
						error: null,
						message: data.message,
					});
				}, (error) => {
					this.set('error', error);
				});
			}
		}
	}
});
