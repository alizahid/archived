import Ember from 'ember'

export function initialize() {
	Ember.LinkComponent.reopen({
		attributeBindings: ['data-notifications']
	})

	Ember.Controller.reopen({
		theme: Ember.computed(function() {
			const themes = ['one', 'two', 'three', 'four', 'five']

			let theme = themes[Math.floor(Math.random() * themes.length)]

			return `theme ${theme}`
		})
	})
}

export default {
	name: 'reopen',
	initialize
}
