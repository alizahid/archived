import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
	name: attr(),
	phone: attr(),
	verified: attr(),
	location: attr('location'),
	gas: attr(),
	premium: attr(),
	joined: attr(),
});
