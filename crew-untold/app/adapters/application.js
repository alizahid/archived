import Ember from 'ember'
import DS from 'ember-data'

import ENV from 'crew-untold/config/environment'

export default DS.RESTAdapter.extend({
	storage: Ember.inject.service(),

	host: ENV.APP.api.host,
	namespace: ENV.APP.api.namespace,

	headers: Ember.computed(function() {
		return {
			token: this.get('storage').get('token')
		}
	}).volatile(),

	shouldBackgroundReloadAll() {
		return true
	},
	shouldBackgroundReloadRecord() {
		return true
	}
})
