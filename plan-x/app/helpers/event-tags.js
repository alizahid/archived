import Ember from 'ember';

export function eventTags([tags]) {
	return tags.split(',').join(', ');
}

export default Ember.Helper.helper(eventTags);
