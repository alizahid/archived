import Ember from 'ember';
import {
	currency
} from 'frontend/helpers/currency';
import {
	module,
	test
} from 'qunit';

module('Unit | Helper | currency');

test('it works', function(assert) {
	let product = Ember.Object.create({
		currency: 'AED',
		price: 1234.50,
	});

	let result = currency([product]);

	assert.ok(result.string === 'AED 1234.5' || result.string === 'AED 1,234.5');
});
