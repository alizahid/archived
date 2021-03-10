import Ember from 'ember';
import ENV from 'essence/config/environment';

export default Ember.Controller.extend({
	api: Ember.inject.service(),
	storage: Ember.inject.service(),

	me: Ember.computed(function() {
		return this.get('api').user();
	}).volatile(),

	mapOptions: {
		accessToken: ENV.APP.mapBoxAccessToken
	},
	location: {
		latitude: 48.8588376,
		longitude: 2.2773461,
		zoom: 12
	},

	sellers: Ember.computed('model', 'model.@each', function() {
		let gas = this.get('storage').get('buy');

		if (gas) {
			return this.get('model').filter((user) => {
				return user.get('gas').any((item) => {
					return item.quantity >= gas[item.type].quantity;
				});
			});
		} else {
			return this.get('model');
		}
	})
});
