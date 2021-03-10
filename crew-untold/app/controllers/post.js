import Ember from 'ember'

export default Ember.Controller.extend({
	native: Ember.inject.service(),
	url: Ember.inject.service(),

	actions: {
		reload() {
			this.set('reloading', true)

			this.model.get('comments').reload()
				.then(() => this.set('reloading', false))
		},
		share() {
			this.get('url').shorten(`https://app.crewuntold.com/s/${this.model.id}`)
				.then(url => this.get('native').share(null, url))
		}
	}
})
