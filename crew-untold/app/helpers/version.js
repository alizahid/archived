import Ember from 'ember'

export function version([version]) {
	return version.split('+').shift()
}

export default Ember.Helper.helper(version)
