import DS from 'ember-data'

export default DS.Model.extend({
	user: DS.attr(),
	code: DS.attr(),
	emails: DS.attr()
})
