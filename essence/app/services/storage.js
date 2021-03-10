import Ember from 'ember';

export default Ember.Service.extend({
	namespace: 'essence_',

	get(key) {
		return JSON.parse(localStorage.getItem(this.namespace + key));
	},
	put(key, value) {
		localStorage.setItem(this.namespace + key, JSON.stringify(value));

		return this;
	},
	remove(key) {
		localStorage.removeItem(this.namespace + key);

		return this;
	}
});
