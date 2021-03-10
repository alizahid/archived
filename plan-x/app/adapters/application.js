import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
	storage: Ember.inject.service('storage'),

	host: 'https://plan-x.herokuapp.com',
	namespace: 'v1',

	headers: function () {
		return {
			token: this.get('storage').get('token')
		};
	}.property(),

	shouldReloadAll: function () {
		return true;
	},
	shouldReloadRecord: function () {
		return true;
	}
});
