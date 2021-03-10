import Ember from 'ember'

export default Ember.Route.extend({
	native: Ember.inject.service(),

	model() {
		return this.get('native').location()
	},
	setupController(controller, model) {
		this._super(...arguments)

		controller.setProperties({
			location: model,
			loading: false,
			moved: false
		})
	}
})
