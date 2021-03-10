import Ember from 'ember'

export default Ember.Route.extend({
	auth: Ember.inject.service(),

	model() {
		const auth = this.get('auth')

		if (auth.id()) {
			return this.get('auth').fetch()
		}
	}
})
