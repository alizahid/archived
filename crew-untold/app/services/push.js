import Ember from 'ember'

export default Ember.Service.extend({
	auth: Ember.inject.service(),

	notifications: 0,

	increase() {
		this.incrementProperty('notifications')
	},
	decrease() {
		this.decrementProperty('notifications')
	},
	update(count) {
		this.set('notifications', count)
	},
	reset() {
		this.set('notifications', 0)
	},

	device() {
		return new Ember.RSVP.Promise(resolve => {
			try {
				FCMPlugin.getToken(
					token => resolve({
						id: device.uuid,
						platform: device.platform.toLowerCase(),
						token
					}),
					() => resolve({
						id: device.uuid,
						platform: device.platform.toLowerCase()
					})
				)
			} catch (e) {
				resolve({
					platform: 'web'
				})
			}
		})
	},
	register() {
		try {
			FCMPlugin.onNotification(
				notification => {
					switch (notification.action) {
						case 'comment':
							if (notification.wasTapped) {
								this.get('router').transitionTo('post', notification.target)
							} else {
								this.increase()
							}

							break
					}
				},
				Ember.$.noop,
				Ember.$.noop
			)

			FCMPlugin.onTokenRefresh(token => {
				let user = this.get('auth').get('user')

				user.set('device', {
					id: device.uuid,
					platform: device.platform.toLowerCase(),
					token
				})

				user.save()
			})
		} catch (e) {}
	}
})
