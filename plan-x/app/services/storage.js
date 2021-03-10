import Ember from 'ember';

export default Ember.Service.extend({
	prefix: 'planx_',

	get: function (key) {
		return JSON.parse(localStorage.getItem(this.prefix + key));
	},
	put: function (key, value) {
		localStorage.setItem(this.prefix + key, JSON.stringify(value));
		
		return this;
	},
	remove: function (key) {
		localStorage.removeItem(this.prefix + key);

		return this;
	}
});
