import Ember from 'ember'

const component = Ember.Component.extend({
	tagName: 'footer',
	classNames: ['nav'],

	push: Ember.inject.service(),

	didInsertElement() {
		if (this.active) {
			this.$().find('a').removeClass('active')

			this.$().find(`.${this.active}`).addClass('active')
		}
	},

	click(e) {
		let target = Ember.$(e.target)

		if (target.hasClass('active')) {
			Ember.$('main').stop(true, true).animate({
				scrollTop: 0
			})
		}
	},

	notifications: Ember.computed('push.notifications', function() {
		let notifications = this.get('push').notifications

		if (notifications > 99) {
			return '99+'
		} else {
			return notifications
		}
	})
})

component.reopenClass({
	positionalParams: ['active']
})

export default component
