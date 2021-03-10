import Ember from 'ember';
import ENV from 'essence/config/environment';

export default Ember.Controller.extend({
	locationChanged: Ember.observer('model.location', function() {
		let location = this.get('model').get('location');

		if (location) {
			Ember.$.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + location.latitude + ',' + location.longitude + '&key=' + ENV.APP.geocodingApiKey).then((data) => {
				this.set('area', data.results.shift().formatted_address);
			});
		}
	}),

	actions: {
		save() {
			if (!this.locating) {
				this.get('model').save();
			}
		},

		getLocation() {
			this.set('locating', true);

			navigator.geolocation.getCurrentPosition((position) => {
				this.get('model').set('location', {
					latitude: position.coords.latitude.toFixed(4),
					longitude: position.coords.longitude.toFixed(4)
				});

				this.set('locating', false);
			});
		}
	}
});
