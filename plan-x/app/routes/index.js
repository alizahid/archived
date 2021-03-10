import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service('session'),

	beforeModel: function () {
		if (!this.get('session').isLoggedIn()) {
			this.replaceWith('choose');
		}
	},
	model: function () {
		return Ember.ArrayProxy.extend({
			arrangedContent: Ember.computed.sort('content', 'props'),
			props: ['created:desc']
		}).create({
			content: this.store.findAll('event')
		});
	},
	afterModel: function () {
		var controller = this.get('controller');

		if (controller) {
			controller.get('ptr').done();
		}
	},
	setupController: function (controller, model) {
		this._super(controller, model);

		var id = this.get('session').getUser();

		controller.setProperties({
			menuOpen: false,
			user: this.store.peekRecord('user', id)
		});
	}
});
