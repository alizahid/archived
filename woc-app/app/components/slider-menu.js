import Ember from 'ember'

const component = Ember.Component.extend({
	native: Ember.inject.service(),

	classNames: ['slider-menu'],

	click(e) {
		let target = Ember.$(e.target)

		if (target.hasClass('overlay')) {
			this.set('open', false)
		}
	},

	openChanged: Ember.observer('open', function() {
		if (this.open) {
			this.$().addClass('open')
		} else {
			this.$().removeClass('open')
		}
	}),

	updateStatusBar() {
		this.get('native').updateStatusBar(this.open ? '#32408f' : '#3F51B5')
	}
})

component.reopenClass({
	positionalParams: ['open']
})

export default component
