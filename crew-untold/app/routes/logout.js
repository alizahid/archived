import Ember from 'ember'

export default Ember.Route.extend({
	analytics: Ember.inject.service(),
	storage: Ember.inject.service(),

	activate() {
		this.get('storage').remove('user').remove('token')

		analytics.trackEvent({
			event: 'logout'
		})

		this.transitionTo('login')
	}
})
