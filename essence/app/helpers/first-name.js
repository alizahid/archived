import Ember from 'ember';

export function firstName([name]) {
	return name.split(' ').shift();
}

export default Ember.Helper.helper(firstName);
