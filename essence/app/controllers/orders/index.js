import Ember from 'ember';

export default Ember.Controller.extend({
	orders: Ember.computed('model', function() {
		return Ember.ArrayProxy.extend({
			arrangedContent: Ember.computed.sort('content', 'props'),
			props: ['created:desc']
		}).create({
			content: this.get('model')
		});
	})
});
