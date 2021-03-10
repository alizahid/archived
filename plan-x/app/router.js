import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
	location: config.locationType,

	didTransition: function () {
		this._super(...arguments);

		try {
			var screen = this.currentRouteName;

			if (screen === 'index') {
				screen = 'home';
			} else {
				screen = screen.replace(/.index/, '').replace(/\./g, '/');
			}

			navigator.analytics.sendAppView(this.currentRouteName);
		} catch (ex) {}
	}
});

Router.map(function () {
	this.route('sign-up');

	this.route('choose');

	this.route('login');

	this.route('create');

	this.route('event', {
		path: '/events/:id',
	}, function () {
		this.route('attending');

		this.route('requests');
	});

	this.route('notifications');

	this.route('profile', {
		path: '/profile/:id',
	}, function () {
		this.route('about');
	});
});

export default Router;
