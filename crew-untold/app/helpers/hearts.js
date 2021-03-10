import Ember from 'ember'

export function hearts([hearts]) {
	if (hearts >= 1000) {
		return Math.floor(hearts / 1000) + 'k'
	}

	return hearts
}

export default Ember.Helper.helper(hearts)
