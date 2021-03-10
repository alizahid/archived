import Ember from 'ember';

export default Ember.Controller.extend({
	ajax: Ember.inject.service(),
	storage: Ember.inject.service(),

	code: '+971',

	actions: {
		signup() {
			if (this.name && this.email && this.phone && this.password) {
				this.set('error', null);

				this.get('ajax').post('/users', {
					name: this.name,
					email: this.email,
					phone: {
						code: this.code,
						number: this.phone
					},
					password: this.password
				}).then(data => {
					this.get('storage').put('user', data.user).put('token', data.token);

					this.get('store').findRecord('user', data.user).then(() => {
						this.setProperties({
							error: null,
							name: null,
							email: null,
							phone: null,
							password: null
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
