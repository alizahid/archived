import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['credit-card'],

	didInsertElement() {
		Ember.$('.number', '.credit-card').payment('formatCardNumber');
		Ember.$('.expiry', '.credit-card').payment('formatCardExpiry');
		Ember.$('.code', '.credit-card').payment('formatCardCVC');
	},

	dataChanged: Ember.observer('number', 'expiry', 'code', function() {
		let number = this.number && this.number.replace(/\s/g, ''),
			type = Ember.$.payment.cardType(number),
			expiry = this.expiry && Ember.$.payment.cardExpiryVal(this.expiry),
			code = this.code;

		let validNumber = Ember.$.payment.validateCardNumber(number),
			validExpiry = expiry && Ember.$.payment.validateCardExpiry(expiry.month, expiry.year),
			validCode = Ember.$.payment.validateCardCVC(code, type);

		if (validNumber && validExpiry && validCode) {
			this.set('card', {
				type: type,
				number: number,
				expiry: {
					month: expiry.month < 10 ? '0' + expiry.month : expiry.month.toString(),
					year: expiry.year.toString(),
				},
				code: code
			});
		} else {
			this.set('card', null);
		}
	})
});
