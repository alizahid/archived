import Ember from 'ember'

export default Ember.Component.extend({
	tagName: 'form',
	classNames: ['reply'],

	didInsertElement() {
		let textarea = this.$().find('textarea')

		let padding = parseInt(textarea.css('padding')) * 2

		textarea.height(textarea.get(0).scrollHeight - padding)

		textarea.on('input', function() {
			this.style.height = 'auto'

			textarea.height(this.scrollHeight - padding)
		})
	},

	click(e) {
		e.preventDefault()

		let target = Ember.$(e.target).prop('tagName').toLowerCase()

		if (target === 'a') {
			this.sendAction('send', this.reply)

			this.set('reply', null)
		}
	}
})
