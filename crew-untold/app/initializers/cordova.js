import Ember from 'ember'
import ENV from 'crew-untold/config/environment'

export function initialize(app) {
	if (ENV.environment === 'development') {
		return
	}

	app.deferReadiness()

	document.addEventListener('deviceready', () => {
		try {
			AppRate.preferences.storeAppURL = {
				ios: '1231022491',
				android: 'market://details?id=com.crewuntold'
			}

			AppRate.preferences.customLocale = {
				title: `Rate Crew Untold`,
				message: `Enjoyed the app? Please rate it`,
				cancelButtonLabel: `No`,
				laterButtonLabel: `Maybe later`,
				rateButtonLabel: `Rate now`
			}
		} catch (e) {}

		window.addEventListener('statusTap', () => {
			Ember.$('main').stop(true, true).animate({
				scrollTop: 0
			})
		})

		window.addEventListener('keyboardWillShow', () => Ember.$('body > .ember-view > footer').addClass('hidden'))
		window.addEventListener('keyboardWillHide', () => Ember.$('body > .ember-view > footer').removeClass('hidden'))

		app.advanceReadiness()
	}, false)

	document.addEventListener('resume', () => {
		try {
			codePush.sync(Ember.$.noop, {
				installMode: InstallMode.ON_NEXT_RESUME
			})
		} catch (e) {}
	}, false)
}

export default {
	name: 'cordova',
	initialize
}
