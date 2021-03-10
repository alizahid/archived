import Ember from 'ember';
import ENV from 'essence/config/environment';

export default Ember.Service.extend({
	store: Ember.inject.service(),
	storage: Ember.inject.service(),

	auth() {
		return this.token() ? true : false;
	},
	token() {
		return this.get('storage').get('token');
	},
	id() {
		return this.get('storage').get('user');
	},
	user() {
		return this.get('store').peekRecord('user', this.id());
	},
	refresh() {
		return this.get('store').findRecord('user', this.id());
	},

	GET(url) {
		return new Ember.RSVP.Promise((resolve, reject) => {
			Ember.$.ajax(ENV.APP.apiEndPoint + url, {
				method: 'GET',
				headers: {
					token: this.token()
				}
			}).then((data) => {
				resolve(data);
			}, (xhr) => {
				reject(xhr.responseJSON && xhr.responseJSON.message || xhr.statusText);
			});
		});
	},
	POST(url, data) {
		return new Ember.RSVP.Promise((resolve, reject) => {
			Ember.$.ajax(ENV.APP.apiEndPoint + url, {
				method: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(data),
				headers: {
					token: this.token()
				}
			}).then((data) => {
				resolve(data);
			}, (xhr) => {
				reject(xhr.responseJSON && xhr.responseJSON.message || xhr.statusText);
			});
		});
	}
});
