import Ember from 'ember';

export default Ember.Controller.extend({
	ajax: Ember.inject.service(),

	actions: {
		generate() {
			Dialog.prompt('Enter a message for the request', 'Hello world')
				.then(message => this.get('ajax').post('/one-touch', {
					message: message
				}))
				.then(() => Dialog.alert('Request has been generated'))
				.then(() => this.send('reload'))
				.catch(err => Dialog.alert(err.message));
		},
		reload() {
			this.send('refresh');
		}
	}
});
