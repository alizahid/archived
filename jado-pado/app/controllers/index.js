import Ember from 'ember';

export default Ember.Controller.extend({
	ajax: Ember.inject.service(),
	storage: Ember.inject.service(),

	twoFactor: Ember.computed('model.authy.twoFactor', function() {
		return this.model.get('authy').twoFactor;
	}),

	actions: {
		enable() {
			Dialog.confirm('Are you sure?')
				.then(() => this.get('ajax').post('/two-factor'))
				.then(() => Dialog.prompt('Enter the two factor code'))
				.then(token => this.get('ajax').post('/two-factor/verify', {
					token: token
				}))
				.then(() => this.set('model.authy.twoFactor', true))
				.then(() => Dialog.alert('Two factor authentication has been enabled for your account'))
				.catch(err => Dialog.alert(err.message));
		},
		disable() {
			Dialog.confirm('Are you sure?')
				.then(() => this.get('ajax').delete('/two-factor'))
				.then(() => this.set('model.authy.twoFactor', false))
				.then(() => Dialog.alert('Two factor authentication has been disabled for your account'))
				.catch(err => Dialog.alert(err.message));
		},
		logout() {
			this.get('storage').remove('user').remove('token');

			this.transitionToRoute('login');
		}
	}
});
