import Ember from 'ember';

export default Ember.Component.extend({
	layoutName: 'slide-menu',
	classNames: ['slide-menu'],
	classNameBindings: ['open:visible'],
	click: function (e) {
		var target = $(e.target);

		if (target.hasClass('slide-menu') || target.hasClass('menu') || target.hasClass('content')) {
			this.set('open', false);

			e.preventDefault();
		}
	}
});
