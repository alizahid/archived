import Ember from 'ember'
import config from './config/environment'
import Trackable from 'ember-cli-analytics/mixins/trackable'

const theme = {
	_theme: null,
	get() {
		const themes = ['one', 'two', 'three', 'four', 'five']

		let theme = themes[Math.floor(Math.random() * themes.length)]

		if (theme === this._theme) {
			return this.get()
		}

		this._theme = theme

		return theme
	}
}

const Router = Ember.Router.extend(Trackable, {
	location: config.locationType,
	rootURL: config.rootURL,

	didTransition() {
		this._super(...arguments)

		Ember.$('body').removeClass('one two three four five').addClass(`theme ${theme.get()}`)
	}
})

Router.map(function() {
	this.route('login')
	this.route('logout')
	this.route('sign-up')

	this.route('create')
	this.route('notifications')

	this.route('post', {
		path: '/posts/:id'
	})

	this.route('tags', function() {
		this.route('tag', {
			path: ':id'
		})
	})
	this.route('suggestion')

	this.route('settings', function() {
		this.route('about')
		this.route('terms')
	})
	this.route('invite')
})

export default Router
