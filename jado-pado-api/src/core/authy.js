import authy from 'authy'

const auth = authy(process.env.AUTHY_API_KEY, process.env.AUTHY_API_URL)

export function register(email, phone, code) {
	return new Promise((resolve, reject) => {
		auth.register_user(email, phone, code, false, (err, res) => {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
	})
}

export function request(id) {
	return new Promise((resolve, reject) => {
		auth.request_sms(id, (err, res) => {
			if (err) {
				reject(err)
			} else {
				resolve()
			}
		})
	})
}

export function verify(id, token) {
	return new Promise((resolve, reject) => {
		auth.verify(id, token, (err, res) => {
			if (err) {
				reject(err)
			} else {
				resolve()
			}
		})
	})
}

export function status(id) {
	return new Promise((resolve, reject) => {
		auth.user_status(id, (err, res) => {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
	})
}

export default {
	register: register,
	request: request,
	verify: verify,
	status: status
}
