const aws = require('aws-sdk')

aws.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

module.exports = new aws.S3()
