import Ember from 'ember'

export default Ember.Controller.extend({
	auth: Ember.inject.service(),

	queryParams: ['id'],

	idChanged: Ember.observer('id', function() {
		if (this.id) {
			this.store.findRecord('tag', this.id)
				.then(tag => this.set('tag', tag))
		} else {
			this.set('tag', null)
		}
	}),

	title: Ember.computed('id', function() {
		if (this.id) {
			return Ember.String.htmlSafe(`a post about <em>${this.get('tag.name')}</em>`)
		}
	}),

	actions: {
		create() {
			if (this.body && this.tag) {
				this.set('busy', true)

				this.store.createRecord('post', {
					user: this.get('auth').get('user').id,
					tag: this.tag,
					body: this.body.trim()
				})
					.save()
					.then(post => {
						this.transitionToRoute('post', post)

						this.get('analytics').trackEvent({
							event: 'create-post'
						})

						this.setProperties({
							body: null,
							tag: null
						})
					})
					.finally(() => this.set('busy', false))
			}
		}
	}
})
