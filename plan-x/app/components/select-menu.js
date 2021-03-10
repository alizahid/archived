import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'select',

	content: [],
	labelPath: 'label',
	valuePath: 'value',

	didInsertElement: function () {
		var self = this;

		this.$().on('change', function () {
			var value = $(this).val();

			Ember.run.next(self, function () {
				this.set('value', value);
			});
		});
	},
	willDestroyElement: function () {
		this.$().off('change');
	},

	contentChanged: function () {
		var select = this.$();

		select.html('');

		this.content.forEach(function (item, index) {
			var option = $('<option>');

			var label = item[this.labelPath],
				value = item[this.valuePath];

			if (this.value) {
				if (this.value === value) {
					option.prop('selected', 'selected');
				}
			} else if (index === 0) {
				Ember.run.next(this, function () {
					this.set('value', value);
				});
			}

			option.text(label);
			option.val(value);

			select.append(option);
		}, this);
	}.on('didInsertElement').observes('content.[]'),
	valueChanged: function () {
		if (this.value) {
			this.content.forEach(function (item, index) {
				if (this.value === item[this.valuePath]) {
					var option = this.$().find('option:eq(' + index + ')');

					option.prop('selected', 'selected');
				}
			}, this);
		}
	}.observes('value')
});
