import Ember from 'ember'

const component = Ember.Component.extend({
	tagName: 'p',
	classNames: ['success-message'],
	classNameBindings: ['success:visible'],

	click() {
		this.set('success', false)
	},

	successChanged: Ember.observer('success', function() {
		if (this.success) {
			this.$().text(this.message).addClass('visible')
		} else {
			this.$().text('').removeClass('visible')
		}
	})
})

component.reopenClass({
	positionalParams: ['success', 'message']
})

export default component
