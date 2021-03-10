import Ember from 'ember'

export default Ember.Controller.extend({
	auth: Ember.inject.service(),
	storage: Ember.inject.service(),

	actions: {
		login() {
			const auth = this.get('auth')

			let email = this.email
			let password = this.password

			this.set('busy', true)

			auth.login(email, password)
				.then(data => {
					this.get('storage')
						.put('user', data.user)
						.put('token', data.token)

					this.setProperties({
						email: null,
						password: null,
						error: null
					})

					auth.fetch()
						.then(() => this.transitionToRoute('index'))
				})
				.catch(err => {
					this.setProperties({
						busy: false,
						error: err
					})
				})
		}
	}
})
