import Ember from 'ember'

export default Ember.Service.extend({
	location() {
		return new Ember.RSVP.Promise((resolve, reject) => {
			try {
				navigator.geolocation.getCurrentPosition(position => resolve({
					lat: position.coords.latitude,
					lng: position.coords.longitude
				}), reject)
			} catch (e) {
				reject()
			}
		})
	},

	updateStatusBar(color) {
		try {
			StatusBar.backgroundColorByHexString(color)
		} catch (e) {}
	},

	rate() {
		try {
			AppRate.promptForRating()
		} catch (e) {}
	},
	share(message) {
		try {
			window.plugins.socialsharing.share(message)
		} catch (e) {}
	},
	open(url) {
		try {
			cordova.InAppBrowser.open(url, '_system')
		} catch (e) {}
	},
	map(location) {
		try {
			let platform = cordova.platformId.toLowerCase()

			switch (platform) {
				case 'ios':
					this.open(`maps:0,0?q=${location.lat},${location.lng}`)
					break

				case 'android':
					this.open(`geo:${location.lat},${location.lng}`)
					break
			}
		} catch (e) {}
	}
})
