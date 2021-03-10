import DS from 'ember-data';

export default DS.Model.extend({
	uuid: DS.attr(),
	status: DS.attr(),
	created: DS.attr()
});
