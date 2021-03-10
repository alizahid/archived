import Ember from 'ember';

export default Ember.Route.extend({
	model: function () {
		return Ember.ArrayProxy.extend({
			arrangedContent: Ember.computed.sort('content', 'props'),
			props: ['created:desc']
		}).create({
			content: this.store.findAll('notification')
		});
	},
	afterModel: function () {
		var controller = this.get('controller');

		if (controller) {
			controller.get('ptr').done();
		}
	}
});
