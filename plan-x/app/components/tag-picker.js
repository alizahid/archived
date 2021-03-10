import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['tag-picker'],

	tags: function () {
		return this.get('content').filterBy('selected', false);
	}.property('content'),
	selected: function () {
		return this.get('content').filterBy('selected', true);
	}.property('content'),

	valueChanged: function () {
		var value = this.get('selected').reduce(function (tags, tag) {
			tags.push(tag.value);

			return tags;
		}, []).join(',');

		this.set('value', value);
	}.observes('selected'),

	click: function (e) {
		if ($(e.target).hasClass('selected') || $(e.target).hasClass('placeholder')) {
			this.$().find('.overlay').stop(true, true).fadeIn('fast');
		}
	},

	actions: {
		closePicker: function () {
			this.$().find('.overlay').stop(true, true).fadeOut('fast');
		},
		addTag: function (tag) {
			Ember.set(tag, 'selected', true);

			this.notifyPropertyChange('tags');
			this.notifyPropertyChange('selected');

			this.send('closePicker');
		},
		removeTag: function (tag) {
			Ember.set(tag, 'selected', false);

			this.notifyPropertyChange('tags');
			this.notifyPropertyChange('selected');
		}
	}
});
