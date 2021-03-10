import Ember from 'ember'
import InfinityRoute from 'ember-infinity/mixins/route'

export default Ember.Route.extend(InfinityRoute, {
	model() {
		return this.infinityModel('discount', {
			perPage: 100,
			startingPage: 0
		})
	}
})
