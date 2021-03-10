import Ember from 'ember'

export default Ember.Service.extend({
	ajax: Ember.inject.service(),
	storage: Ember.inject.service(),
	store: Ember.inject.service(),

	id() {
		return this.get('storage').get('user')
	},
	user() {
		let id = this.id()

		return this.get('store').peekRecord('user', id)
	},

	login(email, password) {
		return this.get('ajax').post('/sessions', {
			data: JSON.stringify({
				email,
				password
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	},
	logout() {
		return this.get('ajax').delete('/sessions')
	},

	fetch() {
		let id = this.get('storage').get('user')

		return Ember.RSVP.all([
			this.get('store').findRecord('user', id),
			this.get('store').findAll('airline'),
			this.get('store').findAll('category')
		])
	}
})
