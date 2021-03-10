import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'input',
	attributeBindings: ['placeholder', 'readonly'],
	readonly: 'readonly',

	click: function () {
		var self = this;

		try {
			datePicker.show({
				date: new Date(),
				mode: 'date'
			}, function (date) {
				self.set('value', date);
			}, function () {
				self.set('value', null);
			});
		} catch (ex) {}
	},

	valueChanged: function () {
		var date = this.get('value');

		if (date) {
			this.$().val(this.MONTHS[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear());
		} else {
			this.$().val('');
		}
	}.on('didInsertElement').observes('value'),

	MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
});
