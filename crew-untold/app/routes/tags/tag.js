import Ember from 'ember'
import InfinityRoute from 'ember-infinity/mixins/route'

export default Ember.Route.extend(InfinityRoute, {
	totalPagesParam: 'meta.total',

	model(params) {
		this.setProperties({
			_canLoadMore: true,
			_before: undefined
		})

		return this.infinityModel('post', {
			tag: params.id
		}, {
			before: '_before'
		})
	},
	setupController(controller) {
		this._super(...arguments)

		controller.set('id', this.context.query.tag)
	},

	afterInfinityModel(model) {
		this.set('_canLoadMore', model.get('length') > 0)

		let last = model.get('lastObject.created') ? new Date(model.get('lastObject.created')) : new Date()

		this.set('_before', last.getTime())
	}
})
