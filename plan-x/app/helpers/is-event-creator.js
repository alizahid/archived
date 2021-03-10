import Ember from 'ember';

export function isEventCreator([event, user]) {
	return event.get('user').get('id') === user.get('id');
}

export default Ember.Helper.helper(isEventCreator);
