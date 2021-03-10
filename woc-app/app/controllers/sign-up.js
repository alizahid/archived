import Ember from 'ember'

const defaultUser = () => JSON.parse('{"phone":{"code":"+971"}}')

export default Ember.Controller.extend({
	auth: Ember.inject.service(),
	storage: Ember.inject.service(),

	user: defaultUser(),

	genders: [{
		value: 'female',
		label: 'Female'
	}, {
		value: 'male',
		label: 'Male'
	}, {
		value: 'other',
		label: 'Other'
	}],

	actions: {
		signUp() {
			this.set('busy', true)

			this.store.createRecord('user', this.user)
				.save()
				.then(user => {
					this.get('storage')
						.put('user', user.id)
						.put('token', user.get('token'))

					this.setProperties({
						user: defaultUser(),
						error: null
					})

					this.get('auth').fetch()
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
