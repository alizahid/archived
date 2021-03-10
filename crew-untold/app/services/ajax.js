import Ember from 'ember'
import ENV from 'crew-untold/config/environment'

import AjaxService from 'ember-ajax/services/ajax'

export default AjaxService.extend({
	storage: Ember.inject.service(),

	host: ENV.APP.api.host,
	namespace: ENV.APP.api.namespace,

	headers: Ember.computed(function() {
		return {
			'Content-Type': 'application/json',
			token: this.get('storage').get('token')
		}
	}).volatile(),

	parse(data) {
		return {
			data: JSON.stringify(data)
		}
	}
})
