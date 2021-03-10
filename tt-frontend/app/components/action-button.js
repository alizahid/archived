import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'a',
	classNames: ['action'],

	click() {
		if (typeof this.action === 'function') {
			this.action();
		}
	}
});
