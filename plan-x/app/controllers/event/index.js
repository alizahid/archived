import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service('session'),
	api: Ember.inject.service('api'),

	actions: {
		showAttending: function () {
			this.transitionToRoute('event.attending');
		},
		join: function () {
			var event = this.get('model');

			var self = this;

			this.get('api').joinEvent(event).done(function () {
				var id = self.get('session').getUser(),
					user = self.store.peekRecord('user', id);

				event.get('requests').pushObject(user);

				self.get('api').analytics.eventJoined(event);
			});
		},
		reply: function () {
			if (this.reply) {
				this.set('replying', true);

				var user = this.get('session').getUser(),
					event = this.get('model');

				var self = this;

				var comment = this.store.createRecord('comment', {
					event: event,
					user: this.store.peekRecord('user', user),
					body: this.reply
				});

				event.get('comments').pushObject(comment);

				comment.save().then(function () {
					self.setProperties({
						reply: null,
						replying: null
					});

					self.get('api').analytics.commentAdded(event, comment);
				});
			}
		}
	}
});
