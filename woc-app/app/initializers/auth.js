import Ember from 'ember'

export function initialize() {
	Ember.Route.reopen({
		beforeModel(transition) {
			const skip = ['login', 'sign-up', 'reset-password']

			let user = localStorage.getItem('woc-user')
			let target = transition.targetName.split('.').shift()

			if (user && skip.indexOf(target) >= 0) {
				this.replaceWith('index')
			} else if (!user && skip.indexOf(target) < 0) {
				this.replaceWith('login')
			}
		}
	})
}

export default {
	name: 'auth',
	initialize
}
