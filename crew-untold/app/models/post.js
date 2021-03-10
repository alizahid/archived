import Ember from 'ember'
import DS from 'ember-data'

export default DS.Model.extend({
	ajax: Ember.inject.service(),
	auth: Ember.inject.service(),
	native: Ember.inject.service(),

	user: DS.attr(),
	tag: DS.belongsTo(),
	body: DS.attr(),
	hearts: DS.attr(),
	liked: DS.attr(),
	created: DS.attr({
		defaultValue() {
			return Date.now()
		}
	}),
	comments: DS.hasMany({
		async: true
	}),

	_comments: Ember.computed.sort('comments', 'sort'),
	sort: ['created:asc'],

	heart() {
		this.toggleProperty('liked')

		this.get('ajax').post(`/posts/${this.id}/heart`)
			.then(data => {
				this.setProperties({
					hearts: data.post.hearts,
					liked: data.post.liked
				})
			})
	},

	block() {
		return new Ember.RSVP.Promise((resolve, reject) => {
			const native = this.get('native')

			native.confirm(`Are you sure you want to block this user?`, [`Block`, `Cancel`])
				.then(() => this.get('ajax').post(`/users/${this.get('user')}/block`))
				.then(data => native.alert(data.message))
				.then(resolve)
				.catch(err => {
					let message = Ember.get(err, 'errors.firstObject.detail.message')

					native.alert(message)

					reject()
				})
		})
	},
	hide() {
		return new Ember.RSVP.Promise((resolve, reject) => {
			const native = this.get('native')

			native.confirm(`Are you sure you want to hide this post?`, [`Hide`, `Cancel`])
				.then(() => this.get('ajax').post(`/posts/${this.id}/hide`))
				.then(data => native.alert(data.message))
				.then(resolve)
				.catch(err => {
					let message = Ember.get(err, 'errors.firstObject.detail.message')

					native.alert(message)

					reject()
				})
		})
	},
	report() {
		return new Ember.RSVP.Promise((resolve, reject) => {
			const ajax = this.get('ajax')
			const native = this.get('native')

			native.prompt(`Why are you reporting this post?`, [`Report`, `Cancel`])
				.then(details => {
					let data = ajax.parse({
						details
					})

					return ajax.post(`/posts/${this.id}/report`, data)
				})
				.then(data => native.alert(data.message))
				.then(resolve)
				.catch(err => {
					let message = Ember.get(err, 'errors.firstObject.detail.message')

					native.alert(message)

					reject()
				})
		})
	}
})
