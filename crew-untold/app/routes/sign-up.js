import Ember from 'ember'

export default Ember.Route.extend({
	auth: Ember.inject.service(),
	push: Ember.inject.service(),
	storage: Ember.inject.service(),

	setupController(controller) {
		controller.setProperties({
			busy: false,
			error: null
		})
	},

	actions: {
		signUp() {
			const controller = this.get('controller')

			let {
				code,
				email,
				password
			} = controller

			if (code && email && password) {
				controller.setProperties({
					busy: true,
					error: null
				})

				this.get('push').device()
					.then(device => {
						let user = {
							code,
							email,
							password,
							device
						}

						this.store.createRecord('user', user)
							.save()
							.then(user => {
								this.get('storage').put('user', user.id).put('token', user.get('token'))

								const analytics = this.get('analytics')

								analytics.identify({
									id: user.id
								})

								analytics.trackEvent({
									event: 'sign-up'
								})

								this.get('auth').notifyPropertyChange('id').notifyPropertyChange('user')

								return this.store.findAll('tag')
							})
							.then(() => {
								controller.setProperties({
									code: null,
									email: null,
									password: null
								})

								this.transitionTo('index')
							})
							.catch(error => controller.set('error', error))
							.finally(() => controller.set('busy', false))
					})
			}
		}
	}
})
