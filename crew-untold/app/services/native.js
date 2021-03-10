import Ember from 'ember'

export default Ember.Service.extend({
	rate() {
		try {
			AppRate.promptForRating()
		} catch (e) {}
	},
	share(message, url) {
		try {
			window.plugins.socialsharing.shareWithOptions({
				message,
				url
			})
		} catch (e) {}
	},
	actionsheet(buttons, title) {
		return new Ember.RSVP.Promise((resolve, reject) => {
			try {
				window.plugins.actionsheet.show({
					addCancelButtonWithLabel: `Cancel`,
					buttonLabels: buttons,
					title
				}, button => resolve(button))
			} catch (e) {
				reject()
			}
		})
	},
	alert(message, button = `Okay`) {
		try {
			navigator.notification.alert(message, Ember.$.noop, '', button)
		} catch (e) {}
	},
	confirm(message, buttons = [`Yes`, `No`]) {
		return new Ember.RSVP.Promise((resolve, reject) => {
			try {
				navigator.notification.confirm(message, button => {
					if (button === 1) {
						resolve()
					} else {
						reject()
					}
				}, '', buttons)
			} catch (e) {
				reject()
			}
		})
	},
	prompt(message, buttons = [`Yes`, `No`], defaultText = '') {
		return new Ember.RSVP.Promise((resolve, reject) => {
			try {
				navigator.notification.prompt(message, data => {
					if (data.buttonIndex === 1) {
						resolve(data.input1)
					} else {
						reject()
					}
				}, '', buttons, defaultText)
			} catch (e) {
				reject()
			}
		})
	},
	copy(text) {
		try {
			cordova.plugins.clipboard.copy(text)
		} catch (e) {}
	},
	statusbar: {
		background(color = null) {
			try {
				if (color === null) {
					let platform = device.platform.toLowerCase()

					if (platform === 'ios') {
						StatusBar.backgroundColorByName('white')
					} else {
						StatusBar.backgroundColorByName('black')
					}

					return
				}

				StatusBar.backgroundColorByHexString(color)
			} catch (e) {}
		}
	}
})
