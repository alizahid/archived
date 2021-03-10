import Ember from 'ember';
import ENV from 'jado-pado/config/environment';

export default Ember.Service.extend({
	storage: Ember.inject.service(),

	host: ENV.APP.apiEndPoint,

	request(url, options = {}) {
		return new Ember.RSVP.Promise((resolve, reject) => {
			Ember.$.ajax(this.host + url, {
				type: options.type || 'GET',
				contentType: 'application/json',
				dataType: 'json',
				data: options.data,
				headers: options.headers || {
					token: this.get('storage').get('token')
				}
			}).then(data => {
				resolve(data);
			}, err => {
				reject(err.responseJSON);
			});
		});
	},
	post(url, data, headers) {
		return this.request(url, {
			type: 'POST',
			data: JSON.stringify(data),
			headers: headers
		});
	},
	put(url, data) {
		return this.request(url, {
			type: 'PUT',
			data: JSON.stringify(data)
		});
	},
	delete(url) {
		return this.request(url, {
			type: 'DELETE'
		});
	}
});
