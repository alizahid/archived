import Ember from 'ember'

export default Ember.Route.extend({
	model(params) {
		return this.store.findRecord('post', params.id)
	},
	setupController(controller) {
		this._super(...arguments)

		controller.send('reload')
	}
})
