import crypto from 'crypto'

export function token(name, email) {
	return crypto.createHash('sha256').update(name + email + Date.now()).digest('hex')
}

export function oneTouch(data, secret) {
	return crypto.createHmac('sha256', secret).update(data).digest('base64')
}

export default {
	token: token,
	oneTouch: oneTouch
}
