import Ember from 'ember';

export function firstName([name]) {
	return name.split(' ')[0];
}

export default Ember.Helper.helper(firstName);
