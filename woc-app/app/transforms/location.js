import DS from 'ember-data'

export default DS.Transform.extend({
	deserialize(serialized) {
		return {
			lat: serialized.pop(),
			lng: serialized.pop()
		}
	},

	serialize(deserialized) {
		return [deserialized.lng, deserialized.lat]
	}
})
