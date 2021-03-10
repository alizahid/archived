import Ember from 'ember'

export default Ember.Controller.extend({
	tag: Ember.computed('id', function() {
		return this.store.peekRecord('tag', this.id)
	}),

	actions: {
		create() {
			this.transitionToRoute('create', {
				queryParams: {
					id: this.get('tag').id
				}
			})
		}
	}
})
