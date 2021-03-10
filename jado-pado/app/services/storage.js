import Ember from 'ember';

export default Ember.Service.extend({
	prefix: 'dp',

	get(key) {
		return JSON.parse(localStorage.getItem(`${this.prefix}_${key}`));
	},
	put(key, value) {
		localStorage.setItem(`${this.prefix}_${key}`, JSON.stringify(value));

		return this;
	},
	remove(key) {
		localStorage.removeItem(`${this.prefix}_${key}`);

		return this;
	}
});
