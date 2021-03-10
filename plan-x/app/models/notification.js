import DS from 'ember-data';

export default DS.Model.extend({
	body: DS.attr('string'),
	created: DS.attr('date'),
	action: DS.attr('string'),
	target_type: DS.attr('string'),
	target_id: DS.attr('string'),
	user: DS.belongsTo('user'),
	read: DS.attr('boolean')
});
