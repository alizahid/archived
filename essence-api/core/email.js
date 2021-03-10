const postmark = require('./postmark');

module.exports = {
	templates: {
		WELCOME: process.env.POSTMARK_TEMPLATE_WELCOME,
		RESET: process.env.POSTMARK_TEMPLATE_RESET,
		RECEIPT: process.env.POSTMARK_TEMPLATE_RECEIPT,
	},

	send(email, data, template) {
		return new Promise((resolve, reject) => {
			postmark.sendEmailWithTemplate({
				TemplateId: template,
				TemplateModel: data,
				To: email,
				From: process.env.POSTMARK_EMAIL
			}, (err) => {
				if (err) {
					console.error('postmark', err);

					reject(err);
				} else {
					resolve();
				}
			});
		});
	}
};
