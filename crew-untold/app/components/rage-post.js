import Ember from 'ember'
import GesturesMixin from 'crew-untold/mixins/gestures'

const component = Ember.Component.extend(GesturesMixin, {
	classNames: ['post'],
	classNameBindings: ['post.liked:liked'],

	auth: Ember.inject.service(),
	native: Ember.inject.service(),
	url: Ember.inject.service(),

	tap(e) {
		let target = Ember.$(e.target).prop('tagName').toLowerCase()

		if (target === 'aside') {
			this.post.heart()
		} else if (target === 'a') {
			// navigate to tag
		} else {
			this.get('router').transitionTo('post', this.post.id)
		}
	},
	press() {
		const native = this.get('native')

		let user = this.get('auth').get('id')

		if (user === this.post.get('user')) {
			native.actionsheet([`Copy`, `Share`]).then(index => {
				switch (index) {
					case 1:
						this.send('copy')
						break

					case 2:
						this.send('share')
						break
				}
			})

			return
		}

		native.actionsheet([`Copy`, `Share`, `Hide from feed`, `Report post`, `Block user`]).then(index => {
			switch (index) {
				case 1:
					this.send('copy')
					break

				case 2:
					this.send('share')
					break

				case 3:
					this.post.hide()
						.then(() => this.send('remove'))
					break

				case 4:
					this.post.report()
						.then(() => this.send('remove'))
					break

				case 5:
					this.post.block()
						.then(() => this.send('remove'))
					break
			}
		})
	},

	actions: {
		copy() {
			this.get('native').copy(this.post.get('body'))
		},
		share() {
			this.get('url').shorten(`https://app.crewuntold.com/s/${this.post.id}`)
				.then(url => this.get('native').share(null, url))
		},
		remove() {
			let single = this.$().hasClass('single')

			if (single) {
				window.history.back()
			} else {
				this.$().fadeOut('fast')
			}
		}
	}
})

component.reopenClass({
	positionalParams: ['post']
})

export default component
