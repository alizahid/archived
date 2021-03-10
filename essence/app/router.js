import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
	location: config.locationType
});

Router.map(function() {
	this.route('login');

	this.route('sign-up');

	this.route('reset');

	this.route('buy');

	this.route('sell');

	this.route('seller', {
		path: '/sellers/:id'
	});

	this.route('orders', function() {
		this.route('order', {
			path: ':id'
		});
	});

	this.route('settings', function() {
		this.route('payment');

		this.route('profile');

		this.route('password');
	});
});

export default Router;
