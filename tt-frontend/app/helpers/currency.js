import Ember from 'ember';

export function currency([product]) {
	let currency = product.get('currency'),
		amount = Number(parseFloat(product.get('price')).toFixed(2));

	return Ember.String.htmlSafe(currency + ' ' + amount.toLocaleString());
}

export default Ember.Helper.helper(currency);
