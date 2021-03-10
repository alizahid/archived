import Ember from 'ember';

export default Ember.Service.extend({
	_token: null,

	setToken(token) {
		this.set('_token', token);
	},
	getToken() {
		return this._token;
	},
	clearToken() {
		this.setToken(null);
	}
});
