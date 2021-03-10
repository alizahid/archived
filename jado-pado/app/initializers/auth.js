import Ember from 'ember';

export function initialize() {
	Ember.Route.reopen({
		beforeModel(transition) {
			let user = localStorage.dp_token;

			const skip = ['login', 'sign-up'];

			let target = transition.targetName.split('.').get(0);

			if (user && skip.indexOf(target) >= 0) {
				this.replaceWith('index');
			} else if (!user && skip.indexOf(target) < 0) {
				this.replaceWith('login');
			}
		}
	});
}

export default {
	name: 'auth',
	initialize
};
