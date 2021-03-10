import Ember from 'ember'
import InfinityRoute from 'ember-infinity/mixins/route'

export default Ember.Route.extend(InfinityRoute, {
	_type: undefined,

	totalPagesParam: 'meta.total',

	model() {
		this.setProperties({
			_canLoadMore: true,
			_before: undefined
		})

		return this.infinityModel('post', {}, {
			before: '_before',
			type: '_type'
		})
	},
	setupController(controller) {
		this._super(...arguments)

		controller.set('type', this._type)
	},

	afterInfinityModel(model) {
		this.set('_canLoadMore', model.get('length') > 0)

		let last = model.get('lastObject.created') ? new Date(model.get('lastObject.created')) : new Date()

		this.set('_before', last.getTime())
	},

	actions: {
		changeType(type) {
			if (type === this._type) {
				return
			}

			this.set('_type', type)

			this.refresh()
		}
	}
})
