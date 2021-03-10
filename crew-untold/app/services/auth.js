import Ember from 'ember'

export default Ember.Service.extend({
	storage: Ember.inject.service(),
	store: Ember.inject.service(),

	id: Ember.computed(function() {
		return this.get('storage').get('user')
	}).volatile(),
	user: Ember.computed('id', function() {
		let id = this.get('id')

		return this.get('store').peekRecord('user', id)
	})
})
