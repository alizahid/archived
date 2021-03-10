import Ember from 'ember'

export default Ember.Controller.extend({
	auth: Ember.inject.service(),

	actions: {
		send() {
			if (this.message) {
				let user = this.get('auth').user()

				let message = {
					user,
					body: this.message
				}

				this.set('busy', true)

				this.store.createRecord('message', message)
					.save()
					.then(() => {
						this.setProperties({
							busy: false,
							sent: true,
							message: null,
							error: null
						})
					})
					.catch(err => {
						this.setProperties({
							busy: false,
							error: err
						})
					})
			}
		}
	}
})
