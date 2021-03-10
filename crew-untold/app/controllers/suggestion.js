import Ember from 'ember'

export default Ember.Controller.extend({
	ajax: Ember.inject.service(),
	native: Ember.inject.service(),

	actions: {
		create() {
			if (this.tag && this.description) {
				this.set('busy', true)

				const ajax = this.get('ajax')

				let data = ajax.parse({
					suggestion: {
						tag: this.tag.trim(),
						description: this.description.trim()
					}
				})

				ajax.post('/suggestions', data)
					.then(data => {
						this.get('analytics').trackEvent({
							event: 'suggestion'
						})

						this.setProperties({
							description: null,
							tag: null
						})

						this.get('native').alert(data.message)
					})
					.finally(() => this.set('busy', false))
			}
		}
	}
})
