import Ember from 'ember'

export default Ember.Controller.extend({
	zoom: 12,
	maxZoom: 16,

	actions: {
		navigate(discount) {
			this.transitionToRoute('discount', discount.id)
		},
		mapLoaded(e) {
			this.set('map', e.target)

			this.send('loadDiscounts')
		},
		mapMoved(e) {
			let center = e.target.getCenter()

			if (this.location.lat !== center.lat || this.location.lng !== center.lng) {
				this.set('moved', true)
			}
		},
		loadDiscounts() {
			this.setProperties({
				loading: true,
				moved: false
			})

			let bounds = this.map.getBounds()

			let southWest = bounds.getSouthWest()
			let northEast = bounds.getNorthEast()

			let query = {
				swLat: southWest.lat,
				swLng: southWest.lng,
				neLat: northEast.lat,
				neLng: northEast.lng
			}

			this.store.query('discount', query)
				.then(discounts => this.setProperties({
					discounts: discounts,
					loading: false
				}))
		}
	}
})
