import Ember from 'ember'
import config from './config/environment'

const Router = Ember.Router.extend({
	location: config.locationType,
	rootURL: config.rootURL
})

Router.map(function() {
	this.route('map')
	this.route('profile')
	this.route('create')

	this.route('login', function() {
		this.route('email')
	})

	this.route('sign-up')

	this.route('contact')

	this.route('discount', {
		path: '/discounts/:id'
	})
})

export default Router
