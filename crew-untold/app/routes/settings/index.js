import Ember from 'ember'

export default Ember.Route.extend({
	auth: Ember.inject.service(),

	model() {
		return this.get('auth').get('user')
	},
	setupController(controller) {
		this._super(...arguments)

		controller.set('busy', false)
	}
})
