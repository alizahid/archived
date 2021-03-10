import Ember from 'ember';

export function initialize() {
	Ember.Route.reopen({
		beforeModel(transition) {
			const skip = ['login', 'sign-up', 'reset'];

			if (localStorage.essence_user && skip.indexOf(transition.targetName) >= 0) {
				this.replaceWith('index');
			} else if (!localStorage.essence_user && skip.indexOf(transition.targetName) < 0) {
				this.replaceWith('login');
			}
		}
	});
}

export default {
	name: 'reopen',
	initialize
};
