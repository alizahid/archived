import Ember from 'ember';

export default Ember.Route.extend({
	model: function (params) {
		return this.store.findRecord('event', params.id);
	},
	afterModel: function () {
		var index = this.controllerFor('event.index'),
			attending = this.controllerFor('event.attending');

		if (index && index.get('ptr')) {
			index.get('ptr').done();
		}

		if (attending && attending.get('ptr')) {
			attending.get('ptr').done();
		}
	},
	setupController: function (controller, model) {
		this._super(controller, model);

		this.controllerFor('event.index').setProperties({
			reply: null,
			replying: null
		});
	},
	actions: {
		reload: function () {
			this.refresh();
		}
	}
});
