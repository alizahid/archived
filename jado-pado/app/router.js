import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
	location: config.locationType,
	rootURL: config.rootURL
});

Router.map(function() {
	this.route('login', function() {
		this.route('verify');
	});

	this.route('sign-up');

	this.route('requests');
});

export default Router;
