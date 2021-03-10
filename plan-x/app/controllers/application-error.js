import Ember from 'ember';

export default Ember.Controller.extend(Ember.Evented, {
	actions: {
		retry: function () {
			if (this.transition) {
				this.transition.retry();
			} else {
				window.location.reload();
			}
		}
	}
});
