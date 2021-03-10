import Ember from 'ember'

export default Ember.Service.extend({
	ajax: Ember.inject.service(),

	shorten(url) {
		const ajax = this.get('ajax')

		let data = ajax.parse({
			url
		})

		return ajax.post('/url', data)
			.then(url => url.short)
	}
})
