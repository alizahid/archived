import Ember from 'ember'

export default Ember.Service.extend({
	prefix: 'woc',
	delimeter: '-',

	get(key) {
		let item = localStorage.getItem(this.prefix + this.delimeter + key)

		return JSON.parse(item)
	},
	put(key, value) {
		let item = JSON.stringify(value)

		localStorage.setItem(this.prefix + this.delimeter + key, item)

		return this
	},
	remove(key) {
		localStorage.removeItem(this.prefix + this.delimeter + key)

		return this
	}
})
