import Ember from 'ember';

export default Ember.Controller.extend({
	save: function () {
		var event = this.get('model');

		if (event.get('requests').get('length') > 0) {
			event.save();
		}
	},
	requestsChanged: function () {
		var event = this.get('model');

		if (event.get('requests').get('length') === 0) {
			event.save();
		}
	}.observes('model.requests.[]'),
	actions: {
		reload: function () {
			this.get('target.router').refresh();
		},
		accept: function (user) {
			var event = this.get('model');

			event.get('requests').removeObject(user);

			event.get('attending').pushObject(user);

			Ember.run.throttle(this, 'save', 3000, false);
		},
		decline: function (user) {
			var event = this.get('model');

			event.get('requests').removeObject(user);

			event.get('blocked').pushObject(user);

			Ember.run.throttle(this, 'save', 3000, false);
		}
	}
});
