import Ember from 'ember'

export default Ember.Component.extend({
	tagName: 'header',
	classNames: ['header-menu', 'theme', 'two'],

	click() {
		this.$().toggleClass('open')
	}
})
