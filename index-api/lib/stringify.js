const Baby = require('babyparse')

module.exports = data => {
	return new Promise((resolve, reject) => {
		try {
			let csv = Baby.unparse(data, {
				quotes: true
			})

			resolve(csv)
		} catch (err) {
			reject(err)
		}
	})
}
