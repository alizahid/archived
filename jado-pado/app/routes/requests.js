import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return Ember.ArrayProxy.extend({
			arrangedContent: Ember.computed.sort('content', 'props'),
			props: ['created:desc']
		}).create({
			content: this.store.findAll('request')
		});
	},

	actions: {
		refresh() {
			this.refresh();
		}
	}
});
