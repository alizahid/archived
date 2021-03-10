import DS from 'ember-data'

export default DS.Model.extend({
	user: DS.attr(),
	post: DS.belongsTo(),
	body: DS.attr(),
	created: DS.attr({
		defaultValue() {
			return Date.now()
		}
	})
})
