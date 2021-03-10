import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
	token: attr(),
	premium: attr(),
	expiry: attr(),
	last4: attr(),
});
