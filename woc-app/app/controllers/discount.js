import Ember from 'ember'

export default Ember.Controller.extend({
	native: Ember.inject.service(),

	actions: {
		openMap() {
			let location = this.get('model.place.location')

			if (location) {
				this.get('native').map(location)
			}
		},
		share() {
			let discount = this.get('model.discount')
			let place = this.get('model.place.name')

			let message = `You can get ${discount} discount at ${place}. I found it on World of Crew! Check it out: https://worldofcrew.com`

			this.get('native').share(message)
		},
		call() {
			let number = this.get('model.place.number')

			if (number) {
				this.get('native').call(number)
			}
		}
	}
})
