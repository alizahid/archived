import Ember from 'ember'

export default Ember.Component.extend({
	tagName: 'a',
	classNames: ['back'],

	click(e) {
		e.preventDefault()

		if (window.history.length <= 1) {
			this.get('router').replaceWith('index')
		} else {
			window.history.back()
		}
	}
})
