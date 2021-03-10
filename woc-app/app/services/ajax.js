import Ember from 'ember'
import ENV from 'woc/config/environment'

import AjaxService from 'ember-ajax/services/ajax'

export default AjaxService.extend({
	storage: Ember.inject.service(),

	host: ENV.APP.api.host,
	namespace: ENV.APP.api.namespace,

	headers: Ember.computed(function() {
		return {
			token: this.get('storage').get('token')
		}
	}).volatile()
})
