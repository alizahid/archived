import Ember from 'ember';

export default Ember.Service.extend({
	push: null,

	register: function (callback) {
		var SENDER_ID = '535241555343';

		try {
			var push = PushNotification.init({
				android: {
					senderID: SENDER_ID,
					icon: 'ic_clear_black_48dp',
					iconColor: 'black'
				},
				ios: {
					alert: true,
					badge: true,
					clearBadge: true,
					senderID: SENDER_ID
				}
			});

			this.set('push', push);

			push.on('registration', function (data) {
				if (typeof callback === 'function') {
					callback(data.registrationId);
				}
			});

			var router = this.get('router');

			var notificationCallback = function (action, id) {
				switch (action) {
					case 'comment':
					case 'accepted':

						router.transitionTo('event', id);

						break;

					case 'request':

						router.transitionTo('event.requests', id);

						break;
				}
			};

			push.on('notification', function (data) {
				var target = data.additionalData.target;

				try {
					if (device.platform.toLowerCase() === 'ios') {
						target = JSON.parse(target);
					}
				} catch (ex) {}

				if (data.additionalData.foreground) {
					navigator.notification.confirm(data.message, function (button) {
						if (button === 1) {
							notificationCallback(data.additionalData.action, target.id);
						}
					}, data.title, ['View', 'Dismiss']);
				} else {
					notificationCallback(data.additionalData.action, target.id);
				}
			});

			push.on('error', function (e) {
				console.error('push', e);
			});

		} catch (ex) {}
	},
	unregister: function (callback) {
		try {
			this.get('push').unregister(function () {
				if (typeof callback === 'function') {
					callback();
				}
			});
		} catch (ex) {}
	}
});
