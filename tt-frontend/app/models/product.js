import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
	name: attr(),
	description: attr(),
	price: attr(),
	currency: attr(),
	categories: attr(),
	link: attr(),
	image: attr(),
});
