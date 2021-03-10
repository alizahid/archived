import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'a',
	classNames: ['button'],
	click: function () {
		if (this.action) {
			this.action();
		}
	}
});
