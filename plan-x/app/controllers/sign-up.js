import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service('session'),
	api: Ember.inject.service('api'),

	countries: [{
		label: 'United Arab Emirates +971',
		value: '+971'
	}],
	user: {},
	currentStep: 1,
	steps: 6,
	step: function () {
		return {
			name: this.currentStep === 1 ? true : false,
			about: this.currentStep === 2 ? true : false,
			email: this.currentStep === 3 ? true : false,
			password: this.currentStep === 4 ? true : false,
			phone: this.currentStep === 5 ? true : false,
			photo: this.currentStep === 6 ? true : false,
			final: this.currentStep === 7 ? true : false
		};
	}.property('currentStep'),
	actions: {
		next: function () {
			var go = true;

			switch (this.currentStep) {
				case 1:
					if (!this.user.name) {
						go = false;
					}

					break;

				case 2:
					if (!this.user.about) {
						go = false;
					}

					break;

				case 3:
					if (!this.user.email || !this.user.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
						go = false;
					}

					break;

				case 4:
					if (!this.user.password) {
						go = false;
					}

					break;

				case 6:
					if (!this.user.photo) {
						go = false;
					}

					break;

				case 7:
					return;
			}

			this.get('api').analytics.signup(this.currentStep);

			if (go) {
				this.incrementProperty('currentStep');
			}
		},
		previous: function () {
			if (this.error) {
				this.setProperties({
					error: null,
					disabled: null
				});
			}

			if (this.currentStep === 0) {
				return;
			}

			this.decrementProperty('currentStep');
		},
		takePhoto: function () {
			try {
				var user = this.user;

				navigator.camera.getPicture(function (data) {
					user.set('photo', data);
				}, function (e) {
					console.error(e);
				}, {
					allowEdit: true,
					cameraDirection: Camera.Direction.FRONT,
					correctOrientation: true,
					destinationType: Camera.DestinationType.DATA_URL,
					encodingType: Camera.EncodingType.JPEG,
					mediaType: Camera.MediaType.PICTURE,
					quality: 75,
					saveToPhotoAlbum: false,
					sourceType: Camera.PictureSourceType.CAMERA,
					targetHeight: 400,
					targetWidth: 400
				});
			} catch (ex) {}
		},
		signup: function () {
			if (this.get('currentStep') < 6) {
				this.send('next');
			} else {
				this.setProperties({
					error: null,
					disabled: true
				});

				var self = this;

				this.get('api').register(this.user).then(function (user) {
					self.get('session').setUser(user);

					self.store.findRecord('user', user.user).then(function () {
						self.transitionToRoute('index');
					});
				}, function (xhr) {
					self.set('error', xhr.responseJSON && xhr.responseJSON.error ? xhr.responseJSON.error : 'Something happened. Please try again.');
				}).always(function () {
					self.set('disabled', null);
				});
			}
		}
	}
});
