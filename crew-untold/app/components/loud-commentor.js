import Ember from 'ember'

const wormhole = Ember.$('#wormhole')

const component = Ember.Component.extend({
	classNames: ['commentor'],

	auth: Ember.inject.service(),
	native: Ember.inject.service(),
	store: Ember.inject.service(),

	didInsertElement() {
		wormhole.addClass('commentor')

		Ember.run.next(() => {
			wormhole.find('form').on('submit', e => e.preventDefault())

			wormhole.on('click', e => {
				if (Ember.$(e.target).hasClass('overlay')) {
					this.hide()
				}
			})
		})
	},
	willDestroyElement() {
		wormhole.removeClass('commentor')
	},

	click(e) {
		e.preventDefault()

		this.show()
	},

	show() {
		wormhole.find('.overlay').addClass('visible')

		this.get('native').statusbar.background('#7F7F7F')
	},
	hide() {
		wormhole.find('.overlay').removeClass('visible')

		this.get('native').statusbar.background()
	},

	actions: {
		post() {
			if (this.body && this.post) {
				this.hide()

				this.get('store').createRecord('comment', {
					user: this.get('auth').get('user').id,
					post: this.post,
					body: this.body.trim()
				})
					.save()
					.then(() => {
						this.set('body', null)

						this.get('analytics').trackEvent({
							event: 'create-comment'
						})
					})
			}
		}
	}
})

component.reopenClass({
	positionalParams: ['post']
})

export default component
