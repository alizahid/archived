import DS from 'ember-data'

export default DS.Model.extend({
	category: DS.belongsTo('category'),
	airline: DS.belongsTo('airline'),
	place: DS.belongsTo('place'),
	description: DS.attr(),
	discount: DS.attr(),
	created: DS.attr()
})
