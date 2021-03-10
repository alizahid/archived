import Ember from 'ember';

export default Ember.Component.extend({
	layoutName: 'pull-to-refresh',
	tagName: 'section',
	classNames: ['pull-to-refresh'],

	distance: 150,
	isLoading: false,
	isPanning: false,

	willInsertElement: function () {
		this.set('pull-to-refresh', this);

		if (this.contentClass) {
			this.$().find('> .content').addClass(this.contentClass);
		}
	},
	didInsertElement: function () {
		this.set('loader', this.$().find('> .loader'));
		this.set('content', this.$().find('> .content'));

		this.get('_hammerInstance').get('pan').set({
			direction: Hammer.DIRECTION_VERTICAL
		});
	},

	hammerOptions: {
		touchAction: 'pan-y',
		ignoreEvents: []
	},
	gestures: {
		panStart: function (e) {
			if (this.isLoading) {
				return false;
			}

			if (e.deltaY < 0) {
				return false;
			}

			if (this.$().scrollTop() === 0) {
				this.set('isPanning', true);

				this.$().css('overflow', 'hidden');
			}
		},
		panDown: function (e) {
			if (this.isLoading || !this.isPanning) {
				return false;
			}

			if (e.deltaY > this.distance) {
				return false;
			}

			e.preventDefault();

			this.loader.css('top', e.deltaY - 60);

			if (e.deltaY > (this.distance / 1.2)) {
				this.loader.addClass('ready');
			} else {
				this.loader.removeClass('ready');
			}

			return false;
		},
		panUp: function (e) {
			if (this.isLoading || !this.isPanning) {
				return false;
			}

			if (e.deltaY > this.distance) {
				return false;
			}

			e.preventDefault();

			this.loader.css('top', e.deltaY - 60);

			if (e.deltaY > (this.distance / 1.2)) {
				this.loader.addClass('ready');
			} else {
				this.loader.removeClass('ready');
			}

			return false;
		},
		panEnd: function () {
			if (this.isLoading) {
				return;
			}

			this.set('isPanning', false);

			this.$().css('overflow', '');

			if (this.loader.hasClass('ready')) {
				window.isLoading = true;

				this.set('isLoading', true);

				this.loader.removeClass('ready').addClass('loading');

				this.sendAction('reload');
			} else {
				this.done();
			}
		}
	},
	done: function () {
		if (this.isDestroying || this.isDestroyed) {
			return;
		}

		var self = this;

		this.loader.stop(true, true).animate({
			top: -50
		}, function () {
			self.loader.css('top', '').removeClass('ready').removeClass('loading');

			self.set('isLoading', false);

			window.isLoading = false;
		});
	}
});
