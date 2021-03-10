import DS from 'ember-data';

export default DS.Model.extend({
	event: DS.belongsTo('event'),
	user: DS.belongsTo('user'),
	body: DS.attr('string'),
	created: DS.attr('date', {
		defaultValue() {
			return new Date();
		}
	})
});
