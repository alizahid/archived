import Ember from 'ember';

const ProfilePhotoComponent = Ember.Component.extend({
	classNames: ['profile-photo'],

	didInsertElement() {
		let avatar = Trianglify({
			height: 120,
			width: 120,
			variance: 0.75,
			cell_size: 100,
			seed: this.name
		}).svg();

		this.$().append(avatar);
	}
});

ProfilePhotoComponent.reopenClass({
	positionalParams: ['name']
});

export default ProfilePhotoComponent;
