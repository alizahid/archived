import Ember from 'ember';

export default Ember.Route.extend({
	deactivate: function () {
		this.get('controller').set('transition', null);
	}
});
