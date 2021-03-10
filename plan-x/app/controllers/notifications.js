import Ember from 'ember';

export default Ember.Controller.extend({
	api: Ember.inject.service('api'),
	session: Ember.inject.service('session'),

	actions: {
		reload: function () {
			this.get('target.router').refresh();
		},
		clearNotifications: function () {
			if (this.get('model').get('length') > 0) {
				var self = this;

				var id = this.get('session').getUser(),
					user = this.store.peekRecord('user', id);

				this.get('api').clearNotifications().done(function () {
					self.send('reload');

					user.set('notifications', 0);

					self.get('api').analytics.notificationsCleared();
				});
			}
		},
		readNotification: function (notification) {
			switch (notification.get('action')) {
				case 'comment':
				case 'accepted':

					this.transitionToRoute('event', notification.get('target_id'));

					break;

				case 'request':

					this.transitionToRoute('event.requests', notification.get('target_id'));

					break;
			}

			if (!notification.get('read')) {
				notification.destroyRecord();

				var id = this.get('session').getUser(),
					user = this.store.peekRecord('user', id);

				user.decrementProperty('notifications');

				this.get('api').analytics.notificationRead(notification);
			}
		}
	}
});
