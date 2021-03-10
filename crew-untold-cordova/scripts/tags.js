const request = require('request')

const data = [{
	name: 'Airline',
	order: 1,
	type: 'tag'
}, {
	name: 'Crew life',
	order: 2,
	type: 'tag'
}, {
	name: 'Around the globe',
	order: 3,
	type: 'tag'
}, {
	name: 'Passengers ',
	order: 4,
	type: 'tag'
}, {
	name: 'Fun time',
	order: 5,
	type: 'tag'
}, {
	name: 'Hot topics',
	order: 6,
	type: 'tag'
}]

data.forEach(tag => {
	request({
		method: 'post',
		// uri: 'http://localhost:3000/v1/tags', // local
		uri: 'https://api.crewuntold.com/v1/tags', // remote
		body: {
			tag: tag
		},
		json: true,
		headers: {
			// token: '071d20c000de3d7a865390290b9fdba3464e419722305716771abf9a63056f24' // local
			token: '49cff302a346bd9cabc5cc0fd50489d1d22460bc90ce1be2d41e5ca7cfab55d0' // remote
		}
	}, (err, res, body) => console.log(body.tag._id, body.tag.name))
})
