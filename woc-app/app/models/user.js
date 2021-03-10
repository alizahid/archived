import DS from 'ember-data'

export default DS.Model.extend({
	name: DS.attr(),
	email: DS.attr(),
	password: DS.attr(),
	phone: DS.attr(),
	gender: DS.attr(),
	birthday: DS.attr(),
	facebookId: DS.attr(),
	created: DS.attr({
		defaultValue() {
			return Date.now()
		}
	}),
	token: DS.attr(),
	device: DS.attr()
})
