import Ember from 'ember'

export default Ember.Route.extend({
	push: Ember.inject.service(),

	model() {
		return this.store.findAll('notification')
	},
	afterModel(model) {
		let unread = model.filter(notification => notification.get('read') === false).length

		this.get('push').update(unread)
	}
})
