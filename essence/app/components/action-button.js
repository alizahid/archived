import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'a',
	classNames: ['action'],

	click() {
		if (this.action) {
			this.action();
		} else if (this.link) {
			this.get('router').transitionTo(this.link);
		}
	}
});
