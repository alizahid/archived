import Ember from 'ember'
import ENV from 'woc/config/environment'

export function initialize(app) {
	if (ENV.environment === 'development') {
		return
	}

	app.deferReadiness()

	document.addEventListener('deviceready', () => {
		try {
			AppRate.preferences.storeAppURL = {
				ios: '1028948704',
				android: 'market://details?id=com.worldofcrew'
			}
		} catch (e) {}

		window.addEventListener('statusTap', () => {
			Ember.$('main').stop(true, true).animate({
				scrollTop: 0
			})
		})

		app.advanceReadiness()
	}, false)
}

export default {
	name: 'cordova',
	initialize
}
