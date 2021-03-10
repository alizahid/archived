import Ember from 'ember'

const component = Ember.Component.extend({
	tagName: 'article',
	classNames: ['discount'],

	click() {
		this.get('router').transitionTo('discount', this.discount.id)
	}
})

component.reopenClass({
	positionalParams: ['discount']
})

export default component
