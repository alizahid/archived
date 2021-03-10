import Ember from 'ember';

export default Ember.Service.extend({
	storage: Ember.inject.service('storage'),
	push: Ember.inject.service('push'),

	API_URL: 'https://plan-x.herokuapp.com/v1',

	isLoggedIn: function () {
		return Boolean(this.get('storage').get('isLoggedIn'));
	},

	getUser: function () {
		return this.get('storage').get('user');
	},
	setUser: function (user) {
		this.get('storage').put('isLoggedIn', true).put('user', user.user).put('token', user.token);
	},

	login: function (email, password) {
		var self = this;

		return $.ajax({
			url: this.API_URL + '/login',
			method: 'POST',
			data: {
				email: email,
				password: password
			}
		}).done(function (data) {
			self.setUser(data);

			try {
				self.get('push').register(function (id) {
					$.ajax({
						url: self.API_URL + '/users/' + data.user,
						method: 'PUT',
						global: false,
						data: {
							device: {
								type: device.platform.toLowerCase(),
								token: id
							}
						},
						headers: {
							token: self.get('storage').get('token')
						}
					});
				});
			} catch (ex) {}

			try {
				navigator.analytics.set('userId', data.user);
			} catch (ex) {}
		});
	},
	logout: function () {
		var token = this.get('storage').get('token');

		this.get('storage').remove('isLoggedIn').remove('user').remove('token');

		this.get('push').unregister();

		try {
			navigator.analytics.set('userId', null);
		} catch (ex) {}

		$.ajax({
			url: this.API_URL + '/logout',
			global: false,
			method: 'DELETE',
			headers: {
				token: token
			}
		});
	}
});
