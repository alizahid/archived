const S3 = require('./s3')

module.exports = (id, data) => {
	return new Promise((resolve, reject) => {
		S3.upload({
			Key: id,
			Body: data,
			ContentType: 'application/json',
			Bucket: process.env.AWS_S3_BUCKET,
			ACL: 'public-read',
		}, (err, data) => {
			if (err) {
				console.error('s3', err)

				reject(err)
			} else {
				resolve('https://index.designplox.co/download/' + id)
			}
		})
	})
}
