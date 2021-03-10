import Ember from 'ember'

const component = Ember.Component.extend({
	classNames: ['notification'],
	classNameBindings: ['notification.read:read:unread'],

	push: Ember.inject.service(),
	store: Ember.inject.service(),
	router: Ember.inject.service(),

	body: Ember.computed('notification.action', function() {
		let action = this.notification.get('action')

		switch (action) {
			case 'comment':
				return `Someone replied to your post`
		}
	}),

	click() {
		let notification = this.notification

		if (!notification.get('read')) {
			notification.set('read', true)

			notification.save()
				.then(this.get('push').decrease())
		}

		let action = this.notification.get('action')
		let target = notification.get('target')

		switch (action) {
			case 'comment':
				this.get('router').transitionTo('post', target)
				break
		}
	}
})

component.reopenClass({
	positionalParams: ['notification']
})

export default component
