const Baby = require('babyparse')

module.exports = (csv) => {
	return new Promise((resolve, reject) => {
		try {
			let data = Baby.parse(csv, {
				dynamicTyping: true,
				header: true,
				skipEmptyLines: true
			})

			if (data.errors.length > 0) {
				reject()
			} else {
				resolve(data.data)
			}
		} catch (err) {
			reject(err)
		}
	})
}
