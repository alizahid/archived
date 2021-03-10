import Ember from 'ember'

export default Ember.Controller.extend({
	native: Ember.inject.service(),
	push: Ember.inject.service(),

	actions: {
		toggleNotifications() {
			if (this.busy) {
				return
			}

			this.set('busy', true)

			this.toggleProperty('model.notifications')

			this.get('push').device()
				.then(device => {
					this.model.set('device', device)

					this.model.save()
						.then(() => this.set('busy', false))
				})
		},
		shareApp() {
			this.get('native').share(`Check out Crew Untold`, 'http://crewuntold.com')
		},
		rateApp() {
			this.get('native').rate()
		}
	}
})
