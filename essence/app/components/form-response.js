import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'p',

	willInsertElement() {
		this.$().hide();
	},
	willDestroyElement() {
		if (this.runner) {
			Ember.run.cancel(this.runner);
		}
	},

	delay: 5000,
	runner: null,

	textChanged: Ember.observer('error', 'message', function() {
		if (!this.error && !this.message) {
			return;
		}

		if (this.runner) {
			Ember.run.cancel(this.runner);
		}

		if ((this.error || this.message) !== this.$().text()) {
			this.$().removeClass('error message').text('').hide();
		}

		if (this.error || this.message) {
			this.$()
				.addClass(this.error && 'error')
				.addClass(this.message && 'message')
				.text(this.error || this.message)
				.stop(true, true)
				.fadeIn('fast');

			let runner = Ember.run.later(this, this.hide, this.delay);

			this.set('runner', runner);
		}
	}),

	hide() {
		this.$().stop(true, true).fadeOut('fast');
	}
});
