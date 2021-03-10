import Ember from 'ember'

export default Ember.Controller.extend({
	notifications: Ember.computed.sort('model', 'sort'),
	sort: ['created:desc']
})
