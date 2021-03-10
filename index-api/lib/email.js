const postmark = require('./postmark')

module.exports = (email, id, link) => {
	return new Promise((resolve, reject) => {
		postmark.sendEmailWithTemplate({
			From: process.env.POSTMARK_EMAIL,
			TemplateId: process.env.POSTMARK_TEMPLATE_ID,
			TemplateModel: {
				id: id,
				link: link,
			},
			To: email
		}, (err) => {
			if (err) {
				console.error('postmark', err)

				reject(err)
			} else {
				resolve()
			}
		})
	})
}
