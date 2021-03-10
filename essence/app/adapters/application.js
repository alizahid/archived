import Ember from 'ember';
import RESTAdapter from 'ember-data/adapters/rest';
import ENV from 'essence/config/environment';

export default RESTAdapter.extend({
	api: Ember.inject.service(),

	host: ENV.APP.apiEndPoint,
	namespace: ENV.APP.apiNamespace,

	headers: function() {
		return {
			token: this.get('api').token()
		};
	}.property()
});
