import Ember from 'ember'

export default Ember.Controller.extend({
	auth: Ember.inject.service(),
	native: Ember.inject.service(),
	storage: Ember.inject.service(),

	actions: {
		about() {
			this.get('native').open('https://worldofcrew.com')
		},
		contact() {
			this.transitionToRoute('contact')
		},
		rate() {
			this.get('native').rate()
		},
		share() {
			this.get('native').share('Come checkout World of Crew, an app to find exclusive discounts for airline crews!')
		},
		logout() {
			this.get('auth').logout()

			this.get('storage').remove('user').remove('token')

			this.transitionToRoute('login')
		}
	}
})
