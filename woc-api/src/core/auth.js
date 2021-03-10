import User from '../models/user'

const admin = (req, res, next) => {
	if (req.headers.token) {
		User.findOne()
			.where('token').eq(req.headers.token)
			.select('+role')
			.exec((err, user) => {
				if (err || !user) {
					err = new Error('Invalid authentication token')
					err.status = 403

					return next(err)
				}

				if (user.role === 'admin') {
					req.user = user

					next()
				} else {
					err = new Error('User is not an admin')
					err.status = 403

					next(err)
				}
			})
	} else {
		let err = new Error('Missing authentication token')
		err.status = 401

		next(err)
	}
}

const user = (req, res, next) => {
	if (req.headers.token) {
		User.findOne()
			.where('token').eq(req.headers.token)
			.select('+email')
			.select('+phone')
			.select('+facebookId')
			.select('+token')
			.select('+device')
			.exec((err, user) => {
				if (err || !user) {
					err = new Error('Invalid authentication token')
					err.status = 403

					return next(err)
				}

				req.user = user

				next()
			})
	} else {
		let err = new Error('Missing authentication token')
		err.status = 401

		next(err)
	}
}

export default {
	admin,
	user
}
