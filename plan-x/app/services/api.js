import Ember from 'ember';

export default Ember.Service.extend({
	session: Ember.inject.service('session'),
	storage: Ember.inject.service('storage'),
	push: Ember.inject.service('push'),

	API_URL: 'https://plan-x.herokuapp.com/v1',

	register: function (user) {
		var phone;

		if (user.phone) {
			phone = user.phone.replace(/([^0-9])/gi, '');

			while (phone.substr(0, 1) === '0') {
				phone = phone.substr(1);
			}
		}

		var session = this.get('session');

		var self = this;

		return $.ajax({
			url: this.API_URL + '/users',
			method: 'POST',
			data: {
				name: user.name,
				about: user.about,
				email: user.email,
				password: user.password,
				phone: phone ? user.country + phone : null,
				photo: user.photo.substr('data:image/jpeg;base64,'.length)
			}
		}).done(function (data) {
			session.setUser(data);

			try {
				self.get('push').register(function (token) {
					$.ajax({
						url: self.API_URL + '/users/' + data.user,
						method: 'PUT',
						data: {
							device: {
								type: device.platform.toLowerCase(),
								token: token
							}
						},
						headers: {
							token: data.token
						}
					});
				});
			} catch (ex) {}
		});
	},

	clearNotifications: function () {
		var token = this.get('storage').get('token');

		return $.ajax({
			url: this.API_URL + '/notifications',
			method: 'DELETE',
			headers: {
				token: token
			}
		});
	},

	joinEvent: function (event) {
		var token = this.get('storage').get('token');

		return $.ajax({
			url: this.API_URL + '/events/' + event.get('id') + '/join',
			method: 'POST',
			headers: {
				token: token
			}
		});
	},
	declineUser: function (event, user) {
		var token = this.get('storage').get('token');

		return $.ajax({
			url: this.API_URL + '/events/' + event.get('id') + '/decline/' + user.get('id'),
			method: 'DELETE',
			headers: {
				token: token
			}
		});
	},

	analytics: {
		userRemoved: function (event, user) {
			try {
				navigator.analytics.sendEvent('event', 'user-removed', 'event=' + event.get('id') + ',user=' + user.get('id'));
			} catch (ex) {}
		},
		eventJoined: function (event) {
			try {
				navigator.analytics.sendEvent('event', 'joined', 'event=' + event.get('id'));
			} catch (ex) {}
		},
		commentAdded: function (event, comment) {
			try {
				navigator.analytics.sendEvent('event', 'comment', 'event=' + event.get('id') + ',comment=' + comment.get('id'));
			} catch (ex) {}
		},
		eventCreated: function (event) {
			try {
				navigator.analytics.sendEvent('event', 'new', 'event=' + event.get('id'));
			} catch (ex) {}
		},
		appRate: function () {
			try {
				navigator.analytics.sendEvent('app', 'rate');
			} catch (ex) {}
		},
		appShare: function () {
			try {
				navigator.analytics.sendEvent('app', 'share');
			} catch (ex) {}
		},
		login: function () {
			try {
				navigator.analytics.sendEvent('app', 'login');
			} catch (ex) {}
		},
		logout: function () {
			try {
				navigator.analytics.sendEvent('app', 'logout');
			} catch (ex) {}
		},
		notificationsCleared: function () {
			try {
				navigator.analytics.sendEvent('notifications', 'cleared');
			} catch (ex) {}
		},
		notificationRead: function (notification) {
			try {
				navigator.analytics.sendEvent('notifications', 'read', 'notification=' + notification.get('id'));
			} catch (ex) {}
		},
		photoTaken: function (gallery) {
			try {
				navigator.analytics.sendEvent('user', 'photo', 'gallery=' + gallery);
			} catch (ex) {}
		},
		signup: function (step) {
			try {
				navigator.analytics.sendEvent('user', 'signup', 'udid=' + device.uuid + 'step=' + step);
			} catch (ex) {}
		},
		profileUpdated: function () {
			try {
				navigator.analytics.sendEvent('user', 'profile-updated');
			} catch (ex) {}
		},
		error: function (description, fatal) {
			try {
				navigator.analytics.sendException(description, fatal || false);
			} catch (ex) {}
		}
	}
});
