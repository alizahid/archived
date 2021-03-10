import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	about: DS.attr('string'),
	gender: DS.attr('string'),
	birthday: DS.attr('date'),
	age: DS.attr('number'),
	email: DS.attr('string'),
	phone: DS.attr('string'),
	photo: DS.attr('string'),
	verification: DS.attr('string'),
	notifications: DS.attr('number'),
	joined: DS.attr('date', {
		defaultValue() {
			return new Date();
		}
	})
});
