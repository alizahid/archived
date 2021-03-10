import DS from 'ember-data'

export default DS.Model.extend({
	code: DS.attr(),
	email: DS.attr(),
	password: DS.attr(),
	blocked: DS.attr(),
	hidden: DS.attr(),
	reported: DS.attr(),
	notifications: DS.attr({
		defaultValue: false
	}),
	token: DS.attr(),
	device: DS.attr()
})
