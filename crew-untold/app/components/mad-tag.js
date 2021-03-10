import Ember from 'ember'

const component = Ember.Component.extend({
	classNames: 'tag',

	click() {
		this.get('router').transitionTo('tags.tag', this.tag.id)
	}
})

component.reopenClass({
	positionalParams: ['tag']
})

export default component
