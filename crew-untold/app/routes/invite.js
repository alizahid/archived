import Ember from 'ember'

export default Ember.Route.extend({
	native: Ember.inject.service(),

	model() {
		return this.store.queryRecord('invite', {
			me: true
		})
	},

	actions: {
		share() {
			let code = this.get('controller.model.code')

			this.get('native').share(`Join Crew Untold using this invite code: ${code} http://crewuntold.com`)
		},
		invite() {
			const controller = this.get('controller')
			const model = controller.get('model')

			let {
				emailOne,
				emailTwo,
				emailThree
			} = controller

			if (emailOne || emailTwo || emailThree) {
				controller.setProperties({
					busy: true,
					error: null,
					success: null
				})

				model.set('emails', [emailOne, emailTwo, emailThree].filter(email => email))

				model.save()
					.then(() => {
						this.setProperties({
							emailOne: null,
							emailTwo: null,
							emailThree: null,
							success: `Your friends have been invited`
						})

						this.get('analytics').trackEvent({
							event: 'invite'
						})
					})
					.catch(error => controller.set('error', error))
					.finally(() => controller.set('busy', false))
			}
		}
	}
})
