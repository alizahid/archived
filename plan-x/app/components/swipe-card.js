import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement: function () {
		this.$().css('z-index', this.total - this.index);

		this.get('_hammerInstance').get('pan').set({
			direction: Hammer.DIRECTION_ALL
		});
	},

	hammerOptions: {
		ignoreEvents: []
	},
	gestures: {
		panMove: function (e) {
			this.$().css({
				left: e.deltaX,
				top: e.deltaY
			});
		},
		panEnd: function (e) {
			var threshold = this.$().outerWidth() / 2,
				width = $('body').width();

			var self = this;

			var accept = e.deltaX > threshold,
				decline = e.deltaX < -threshold;

			if (accept || decline) {
				this.$().stop(true, true).animate({
					left: accept ? width : -width,
					top: e.deltaY
				}, 'fast', function () {
					$(this).remove();

					if (accept) {
						self.sendAction('accept');
					} else {
						self.sendAction('decline');
					}
				});
			} else {
				this.$().stop(true, true).animate({
					left: 0,
					top: 0
				}, 'fast');
			}
		}
	}
});
