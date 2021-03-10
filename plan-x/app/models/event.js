import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	session: Ember.inject.service('session'),

	user: DS.belongsTo('user'),
	description: DS.attr('string'),
	tags: DS.attr('string'),
	when: DS.attr('date'),
	where: DS.attr('string'),
	comments: DS.hasMany('comment', {
		defaultValue: []
	}),
	attending: DS.hasMany('user', {
		defaultValue: []
	}),
	requests: DS.hasMany('user', {
		defaultValue: []
	}),
	blocked: DS.hasMany('user', {
		defaultValue: []
	}),
	created: DS.attr('date', {
		defaultValue() {
			return new Date();
		}
	}),

	isCreator: function () {
		var id = this.get('session').getUser();

		return this.get('user').get('id') === id;
	}.property('user'),
	canJoin: function () {
		if (this.get('isCreator')) {
			return false;
		}

		var id = this.get('session').getUser();

		var hasRequested = this.get('requests').any(function (user) {
			if (user.get('id') === id) {
				return true;
			}
		});

		if (hasRequested) {
			return false;
		}

		var isBlocked = this.get('blocked').any(function (user) {
			if (user.get('id') === id) {
				return true;
			}
		});

		var isAttending = this.get('attending').any(function (user) {
			if (user.get('id') === id) {
				return true;
			}
		});

		return !isBlocked && !isAttending;
	}.property('blocked.[]', 'attending.[]', 'requests.[]'),
	hasRequested: function () {
		if (this.get('isCreator')) {
			return false;
		}

		var id = this.get('session').getUser();

		var hasRequested = this.get('requests').any(function (user) {
			if (user.get('id') === id) {
				return true;
			}
		});

		return hasRequested;
	}.property('requests.[]'),
	canComment: function () {
		if (this.get('isCreator')) {
			return true;
		}

		var id = this.get('session').getUser();

		return this.get('attending').any(function (user) {
			if (user.get('id') === id) {
				return true;
			}
		});
	}.property('attending.[]')
});
