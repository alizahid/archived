import Ember from 'ember';

export default Ember.Controller.extend({
	api: Ember.inject.service('api'),
	session: Ember.inject.service('session'),

	actions: {
		showRequests: function () {
			this.transitionToRoute('event.requests');
		},
		remove: function (user) {
			var event = this.get('model');

			try {
				var self = this;

				navigator.notification.confirm('Are you sure?', function (button) {
					if (button === 1) {
						self.get('api').declineUser(event, user).done(function () {
							self.get('model').get('attending').removeObject(user);
						});

						self.get('api').analytics.userRemoved(event, user);
					}
				}, 'Remove person', ['Yes', 'Cancel']);
			} catch (ex) {}
		}
	}
});
