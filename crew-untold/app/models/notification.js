import DS from 'ember-data'

export default DS.Model.extend({
	user: DS.attr(),
	action: DS.attr(),
	target: DS.attr(),
	read: DS.attr(),
	created: DS.attr(),
	updated: DS.attr()
})
