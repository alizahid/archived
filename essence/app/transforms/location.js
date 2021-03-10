import Transform from 'ember-data/transform';

export default Transform.extend({
	deserialize(data) {
		return {
			latitude: data.pop(),
			longitude: data.pop()
		};
	},

	serialize(data) {
		return data ? [data.longitude, data.latitude] : [];
	}
});
