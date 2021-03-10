const request = require('request')

module.exports = options => {
	return new Promise((resolve, reject) => {
		request(options, (error, response, body) => {
			if (error) {
				reject(error)
			} else {
				resolve(body)
			}
		})
	})
}
