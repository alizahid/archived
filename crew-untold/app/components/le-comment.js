import Ember from 'ember'

const component = Ember.Component.extend({
	classNames: ['comment']
})

component.reopenClass({
	positionalParams: ['comment']
})

export default component
