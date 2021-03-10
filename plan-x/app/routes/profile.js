import Ember from 'ember';

export default Ember.Route.extend({
	api: Ember.inject.service('api'),

	model: function (params) {
		return this.store.find('user', params.id);
	},
	actions: {
		saveAbout: function () {
			this.get('api').analytics.profileUpdated();

			window.history.back();
		}
	},

	deactivate: function () {
		var user = this.get('controller').get('model');

		if (user.get('hasDirtyAttributes')) {
			user.save();
		}
	}
});
