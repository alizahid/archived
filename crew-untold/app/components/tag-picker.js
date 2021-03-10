import Ember from 'ember'

const wormhole = Ember.$('#wormhole')

const component = Ember.Component.extend({
	classNames: ['tag-picker'],

	native: Ember.inject.service(),
	store: Ember.inject.service(),

	query: '',
	tags: [],

	results: Ember.computed('tags', 'query', function() {
		let query = this.query.toLowerCase().trim()

		if (query.length >= 2) {
			return this.tags.filter(tag => {
				if (tag.get('name').toLowerCase().indexOf(query) >= 0) {
					return true
				}

				return tag.get('related').filter(related => related.toLowerCase().indexOf(query) >= 0).length > 0
			})
		} else {
			return this.tags
		}
	}),

	willInsertElement() {
		this.get('store').findAll('tag')
			.then(tags => this.set('tags', tags))
	},
	didInsertElement() {
		wormhole.addClass('tag-picker')

		Ember.run.next(() => {
			wormhole.find('form').on('submit', e => e.preventDefault())

			wormhole.on('click', e => {
				if (Ember.$(e.target).hasClass('overlay')) {
					this.hide()
				}
			})
		})
	},
	willDestroyElement() {
		wormhole.removeClass('tag-picker')
	},

	click() {
		this.show()
	},

	show() {
		wormhole.find('.overlay').addClass('visible')

		this.get('native').statusbar.background('#7F7F7F')
	},
	hide() {
		wormhole.find('.overlay').removeClass('visible')

		this.get('native').statusbar.background()
	},

	actions: {
		select(tag) {
			this.setProperties({
				query: '',
				tag
			})

			this.hide()
		}
	}
})

component.reopenClass({
	positionalParams: ['tag']
})

export default component
