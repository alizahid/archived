import Ember from 'ember';

const ProfilePhotoComponent = Ember.Component.extend({
	tagName: 'figure',
	classNames: ['profile-photo'],
	classNameBindings: ['user.verification'],

	click: function (e) {
		var target = $(e.target);

		if (target.hasClass('rotate')) {
			this.rotate();
		} else if (typeof this.action === 'function') {
			this.action();
		} else {
			e.preventDefault();

			var id = this.get('user').get('id'),
				router = this.get('router');

			router.transitionTo('profile', id);
		}
	},

	rotate: function () {
		var user = this.get('user');

		if (user && user.get('photo')) {
			var PREFIX = 'data:image/jpeg;base64,';

			var canvas = document.createElement('canvas');

			canvas.style.display = 'none';

			document.body.appendChild(canvas);

			var image = new Image();

			image.src = PREFIX + user.get('photo');

			image.onload = function () {
				canvas.height = image.width;
				canvas.width = image.height;

				var context = canvas.getContext('2d');

				context.translate(image.height, 0);
				context.rotate(90 * Math.PI / 180);

				context.drawImage(image, 0, 0, image.width, image.height);

				user.set('photo', canvas.toDataURL('image/jpeg').substr(PREFIX.length));

				document.body.removeChild(canvas);
			};
		}
	},

	photoChanged: function () {
		var photo = this.get('user') && this.get('user').get('photo');

		if (photo) {
			this.$().removeClass('photo-camera');

			Ember.run.next(this, function () {
				if (photo.indexOf('http') === 0) {
					this.$().css('background-image', 'url(' + photo + ')');

					this.set('rotatable', false);
				} else {
					this.set('rotatable', this.canRotate);

					this.$().css('background-image', 'url("data:image/jpeg;base64,' + photo + '")');
				}
			});
		}
	}.on('didInsertElement').observes('user.photo')
});

ProfilePhotoComponent.reopenClass({
	positionalParams: ['user']
});

export default ProfilePhotoComponent;
