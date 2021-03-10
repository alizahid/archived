import Ember from 'ember';

const LengthCounterComponent = Ember.Component.extend({
	tagName: 'span',
	classNames: ['length-counter'],

	length: function () {
		return this.string && this.string.length || 0;
	}.property('string'),

	didInsertElement: function () {
		var length = this.get('length'),
			max = this.max,
			value = length / max;

		if (value > 0.8) {
			this.$().addClass('warning');
		} else {
			this.$().removeClass('warning');
		}

		this.$().text(max - length);
	}.observes('length')
});

LengthCounterComponent.reopenClass({
	positionalParams: ['max', 'string']
});

export default LengthCounterComponent;
