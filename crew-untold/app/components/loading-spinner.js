import Ember from 'ember'

const component = Ember.Component.extend({
	classNames: ['empty-message', 'loading'],
	classNameBindings: ['fullscreen', 'small']
})

component.reopenClass({
	positionalParams: ['fullscreen', 'small']
})

export default component
