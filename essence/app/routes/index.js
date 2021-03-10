import Ember from 'ember';

export default Ember.Route.extend({
	titleToken: 'Find gas',

	beforeModel() {
		this.store.unloadAll('seller');
	},
	model() {
		return this.store.findAll('seller');
	},
	setupController(controller) {
		this._super(...arguments);

		navigator.geolocation.getCurrentPosition((position) => {
			controller.setProperties({
				'location.latitude': position.coords.latitude.toFixed(4),
				'location.longitude': position.coords.longitude.toFixed(4)
			});
		});
	},

	activate() {
		Ember.$('body').addClass('full');
	},
	deactivate() {
		Ember.$('body').removeClass('full');
	}
});
