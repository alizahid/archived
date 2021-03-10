import Ember from 'ember'

export default Ember.Component.extend({
	tagName: 'a',
	classNames: ['action'],

	click(e) {
		e.preventDefault()

		if (this.action) {
			this.sendAction('action')
		} else if (this.navigate) {
			this.get('router').transitionTo(this.navigate)
		}
	}
})
