import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
	type: attr(),
	quantity: attr(),
	price: attr(),
});
