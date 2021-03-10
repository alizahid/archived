const request = require('request')

module.exports = (id, data) => {
	return new Promise((resolve, reject) => {
		request(`https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${id}`, (err, res, data) => {
			if (err) {
				reject(err)
			} else {
				resolve(data)
			}
		})
	})
}
