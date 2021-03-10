import Ember from 'ember';

export function formatLocation([location]) {
	return [location.latitude, location.longitude];
}

export default Ember.Helper.helper(formatLocation);
