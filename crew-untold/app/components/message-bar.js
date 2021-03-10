import Ember from 'ember'

export default Ember.Component.extend({
	classNames: ['message-bar'],

	onError: Ember.observer('error', function() {
		if (this.error) {
			let message = typeof this.error === 'string' && this.error || Ember.get(this.error, 'errors.firstObject.detail') || `Something bad happened`

			this.$().addClass('error visible').text(message)
		}
	}),
	onMessage: Ember.observer('message', function() {
		if (this.message) {
			this.$().addClass('message visible').text(this.message)
		}
	}),
	onSuccess: Ember.observer('success', function() {
		if (this.success) {
			this.$().addClass('success visible').text(this.success)
		}
	}),

	click() {
		this.$().removeClass('error message success visible').text('')

		this.setProperties({
			error: null,
			message: null,
			success: null
		})
	}
})
