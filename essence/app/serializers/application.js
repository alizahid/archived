import RESTSerializer from 'ember-data/serializers/rest';

export default RESTSerializer.extend({
	primaryKey: '_id',

	serializeId(id) {
		return id.toString();
	}
});
