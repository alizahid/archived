import Ember from 'ember';

const ErrorMessageComponent = Ember.Component.extend({
	classNames: ['error'],
	tagName: 'p',

	errorChanged: Ember.observer('error', function() {
		if (this.error) {
			this.$().text(this.error.message);
		}
	})
});

ErrorMessageComponent.reopenClass({
	positionalParams: ['error']
});

export default ErrorMessageComponent;
