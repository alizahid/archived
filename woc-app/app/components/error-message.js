import Ember from 'ember'

const component = Ember.Component.extend({
	tagName: 'p',
	classNames: ['error-message'],

	click() {
		this.set('error', null)
	},

	errorChanged: Ember.observer('error', function() {
		let message

		if (this.error) {
			if (this.error.errors.length) {
				let error = this.error.errors.pop()

				message = error.detail.errors.message
			} else {
				message = this.error.errors.message
			}
		} else {
			message = null
		}

		this.$().text(message).toggleClass('visible', message ? true : false)
	})
})

component.reopenClass({
	positionalParams: ['error']
})

export default component
