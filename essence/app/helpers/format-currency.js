import Ember from 'ember';

export function formatCurrency([amount]) {
	amount = parseFloat(amount).toFixed(2);
	amount = Number(amount);

	return Ember.String.htmlSafe('&euro; ' + amount.toLocaleString());
}

export default Ember.Helper.helper(formatCurrency);
