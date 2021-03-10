import authy from 'authy'

import hash from '../core/hash'
import sortQuery from '../core/sort-query'

const auth = authy(process.env.AUTHY_API_KEY, process.env.AUTHY_API_URL)

export function request(id, data) {
	return new Promise((resolve, reject) => {
		auth._request('post', `/onetouch/json/users/${id}/approval_requests`, data, (err, res) => {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
	})
}

export function verify(req) {
	return new Promise((resolve, reject) => {
		let URL = process.env.AUTHY_ONETOUCH_CALLBACK_URL,
			METHOD = req.method,
			NONCE = req.header('x-authy-signature-nonce'),
			PARAMS = sortQuery(req.body)

		let base64 = hash.oneTouch(NONCE + '|' + METHOD + '|' + URL + '|' + PARAMS, process.env.AUTHY_API_KEY)

		base64 === req.header('x-authy-signature') ? resolve() : reject()
	})
}

export default {
	request: request,
	verify: verify
}
