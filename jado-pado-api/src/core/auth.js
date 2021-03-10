import User from '../models/user'

export default function auth(req, res, next) {
	if (req.headers.token) {
		User.findOne()
			.where('token').eq(req.headers.token)
			.select('email token')
			.exec((err, user) => {
				if (err || !user) {
					return res.status(403).send({
						error: 'Invalid authentication token'
					})
				}

				req.user = user

				next()
			})
	} else {
		res.status(401).send({
			error: 'Missing authentication token'
		})
	}
}
