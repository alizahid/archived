import Ember from 'ember';

export default Ember.Controller.extend({
	isLoading: Ember.computed('loading', function() {
		return !this.loading;
	}),
	isError: Ember.computed('error', function() {
		return !this.error;
	}),

	actions: {
		submit() {
			if (!this.loading && this.url) {
				this.setProperties({
					loading: true,
					error: null,
				});

				this.store.query('product', {
					url: this.url,
					random: Math.random(),
				}).then((products) => {
					this.setProperties({
						loading: false,
						error: null,
						url: null,
						products: products
					});
				}).catch((err) => {
					this.setProperties({
						loading: false,
						error: err.errors && err.errors.pop().title,
					});
				});
			}
		},
		restart() {
			if (!this.loading) {
				this.setProperties({
					url: null,
					products: false,
				});
			}
		}
	}
});
