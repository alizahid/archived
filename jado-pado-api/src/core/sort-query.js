import qs from 'qs'

export function sort(data) {
	let sorted = {}

	Object.keys(data)
		.sort()
		.forEach(index => {
			if (typeof data[index] === 'object' && data[index] !== null) {
				sorted[index] = sort(data[index])
			} else {
				sorted[index] = data[index]
			}
		})

	return sorted
}

export function stringify(data) {
	return qs.stringify(data)
}

export default function sortQuery(data) {
	return stringify(sort(data))
}
