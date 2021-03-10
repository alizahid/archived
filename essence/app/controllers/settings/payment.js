import Ember from 'ember';
import ENV from 'essence/config/environment';

export default Ember.Controller.extend({
	api: Ember.inject.service(),

	invalid: Ember.computed('card', 'working', function() {
		return this.working || this.card === null;
	}),

	actions: {
		showCard() {
			this.toggleProperty('showCard');
		},
		upgrade() {
			let ask = confirm('You will be charged € ' + ENV.APP.premiumPrice + ' for premium. It will allow you to contact gas sellers through phone or email.');

			if (ask) {
				this.get('api').POST('/payments/upgrade').then(() => {
					this.get('model').reload();

					this.get('api').refresh();
				}, (error) => {
					alert(error);
				});
			}
		},
		saveCard(card) {
			const api = this.get('api');

			this.setProperties({
				working: true,
				error: null,
			});

			api.POST('/payments/card', card).then(() => {
				this.setProperties({
					working: false,
					card: null,
					showCard: false,
				});

				this.get('model').reload();
			}).catch((data) => {
				this.setProperties({
					working: false,
					error: data.message,
				});
			});
		}
	}
});
