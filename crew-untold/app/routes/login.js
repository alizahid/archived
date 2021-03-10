import Ember from 'ember'

export default Ember.Route.extend({
	ajax: Ember.inject.service(),
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
		login() {
			const controller = this.get('controller')

			let {
				email,
				password
			} = controller

			if (email && password) {
				controller.setProperties({
					busy: true,
					error: null
				})

				this.get('push').device()
					.then(device => {
						const ajax = this.get('ajax')

						let data = ajax.parse({
							email,
							password,
							device
						})

						ajax.post('/sessions', data)
							.then(user => {
								this.get('storage').put('user', user.id).put('token', user.token)

								const analytics = this.get('analytics')

								analytics.identify({
									id: user.id
								})

								analytics.trackEvent({
									event: 'login'
								})

								this.get('auth').notifyPropertyChange('id').notifyPropertyChange('user')

								return Ember.RSVP.all([
									this.store.findRecord('user', user.id),
									this.store.findAll('tag')
								])
							})
							.then(() => {
								controller.setProperties({
									email: null,
									password: null
								})

								this.transitionTo('index')
							})
							.catch(error => controller.set('error', error.payload))
							.finally(() => controller.set('busy', false))
					})
			}
		}
	}
})
