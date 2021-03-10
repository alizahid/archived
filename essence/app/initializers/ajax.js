import Ember from 'ember';

export function initialize() {
	Ember.$(document).ajaxStart(() => {
		NProgress.start();
	});

	Ember.$(document).ajaxStop(() => {
		NProgress.done();
	});
}

export default {
	name: 'ajax',
	initialize
};
