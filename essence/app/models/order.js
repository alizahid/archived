import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {
	belongsTo
} from 'ember-data/relationships';

export default Model.extend({
	seller: belongsTo('seller'),
	items: attr(),
	status: attr(),
	created: attr(),

	total: Ember.computed('items', function() {
		return this.get('items').reduce((total, item) => {
			total += item.quantity * item.price;

			return total;
		}, 0);
	}),
});
