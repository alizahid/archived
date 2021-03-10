import Ember from 'ember';
import ENV from 'jado-pado/config/environment';
import RESTAdapter from 'ember-data/adapters/rest';

export default RESTAdapter.extend({
	storage: Ember.inject.service(),

	host: ENV.APP.apiEndPoint,

	headers: Ember.computed(function() {
		return {
			token: this.get('storage').get('token')
		};
	}).volatile()
});
