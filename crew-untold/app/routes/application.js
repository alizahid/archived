import Ember from 'ember'

export default Ember.Route.extend({
	push: Ember.inject.service(),
	native: Ember.inject.service(),
	storage: Ember.inject.service(),

	beforeModel() {
		let user = this.get('storage').get('user')

		if (user) {
			this.get('analytics').identify({
				id: user
			})

			return Ember.RSVP.all([
				this.store.findRecord('user', user),
				this.store.findAll('tag')
			])
		}
	},
	afterModel() {
		this.get('push').register()
	},

	actions: {
		copy(string) {
			this.get('native').copy(string)
		}
	}
})
