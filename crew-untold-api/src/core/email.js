import postmark from 'postmark'

const client = new postmark.Client(process.env.POSTMARK_API_KEY)

export default {
	send(to, subject, body) {
		client.sendEmail({
			From: process.env.POSTMARK_EMAIL,
			To: to,
			Subject: subject,
			TextBody: body
		}, err => err && console.error('email', err))
	}
}
