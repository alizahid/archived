import DS from 'ember-data'

export default DS.Model.extend({
	name: DS.attr(),
	email: DS.attr(),
	address: DS.attr(),
	location: DS.attr('location'),
	phone: DS.attr(),
	image: DS.attr()
})
