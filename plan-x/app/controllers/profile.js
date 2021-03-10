import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service('session'),
	api: Ember.inject.service('api'),

	editable: function () {
		return this.get('model').get('id') === this.get('session').getUser();
	}.property('model'),

	takePhoto: function (gallery) {
		try {
			var user = this.get('model');

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
				sourceType: gallery ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA,
				targetHeight: 400,
				targetWidth: 400
			});

			this.get('api').analytics.photoTaken(gallery);
		} catch (ex) {}
	},

	actions: {
		editPhoto: function () {
			var isPhoneVerified = this.get('model').get('verification').indexOf('phone') >= 0;

			if (isPhoneVerified) {
				try {
					var self = this;

					window.plugins.actionsheet.show({
						title: 'Upload new profile photo',
						buttonLabels: ['From camera', 'From gallery'],
						addCancelButtonWithLabel: 'Cancel'
					}, function (index) {
						if (index === 1) {
							self.takePhoto(false);
						} else if (index === 2) {
							self.takePhoto(true);
						}
					});
				} catch (ex) {}
			} else {
				this.takePhoto(false);
			}
		},
		editAbout: function () {
			this.transitionToRoute('profile.about');
		}
	}
});
