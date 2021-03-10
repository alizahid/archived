import Ember from 'ember'

const component = Ember.Component.extend({
	done: Ember.computed('model.isLoaded', 'model.content.isLoaded', function() {
		return this.model && this.model.length === 0 || this.model && this.model.isLoaded || this.model.content && this.model.content.isLoaded
	})
})

component.reopenClass({
	positionalParams: ['model', 'message', 'fullscreen']
})

export default component
