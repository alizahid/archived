import Ember from 'ember'

const component = Ember.Component.extend({
	classNames: ['empty-message'],
	classNameBindings: ['fullscreen']
})

component.reopenClass({
	positionalParams: ['message', 'fullscreen']
})

export default component
