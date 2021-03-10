import Ember from 'ember';

const ReadMoreComponent = Ember.Component.extend({
	cutoff: 200,

	tagName: 'p',
	classNames: ['read-more'],

	excerpt: Ember.computed('data', function() {
		if (this.data.length > this.cutoff) {
			let cut = this.data.indexOf(' ', this.cutoff);

			return this.data.substr(0, cut > 0 ? cut : this.cutoff);
		}
	}),

	click(e) {
		e.preventDefault();

		let target = Ember.$(e.target);

		if (target.hasClass('more')) {
			this.set('excerpt', null);
		}
	}
});

ReadMoreComponent.reopenClass({
	positionalParams: ['data']
});

export default ReadMoreComponent;
