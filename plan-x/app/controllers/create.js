import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service('session'),
	index: Ember.inject.controller('index'),
	api: Ember.inject.service('api'),

	activities: function () {
		return 'Bachelor Party,Birthday,Girls Night Out,House Party,Nightclub,Restaurant'.split(',').map(function (activity) {
			var id = activity.toLowerCase().replace(/\s+/g, ' ');

			return {
				value: id,
				label: activity,
				selected: false
			};
		});
	}.property(),

	max: 200,
	counter: function () {
		var length = this.description && this.description.length || 0;

		return length + ' / ' + this.max;
	}.property('description'),

	actions: {
		createEvent: function () {
			if (this.description && this.when && this.where) {
				var id = this.get('session').getUser();

				var event = this.store.createRecord('event', {
					user: this.store.peekRecord('user', id),
					description: this.description,
					when: this.when,
					where: this.where,
					tags: this.tags
				});

				var self = this;

				event.save().then(function (event) {
					self.transitionToRoute('event', event.id);

					self.get('api').analytics.eventCreated(event);
				});
			}
		}
	}
});
