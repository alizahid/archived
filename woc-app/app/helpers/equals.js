import Ember from 'ember'

export function equals([one, two]) {
	return one === two
}

export default Ember.Helper.helper(equals)
