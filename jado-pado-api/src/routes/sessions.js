import express from 'express'
import passwordHash from 'password-hash'

import User from '../models/user'

import auth from '../core/auth'
import authy from '../core/authy'

const router = express.Router()

router.post('/', (req, res, next) => {
	User.findOne()
		.where('email').eq(req.body.email)
		.select('+password')
		.select('+authy')
		.select('+token')
		.exec((err, user) => {
			if (err) {
				return next(err)
			}

			if (!user) {
				return next()
			}

			if (passwordHash.verify(req.body.password, user.password)) {
				if (user.authy.twoFactor) {
					authy.request(user.authy.id)
						.then(() => res.send({
							token: user.token,
							twoFactor: true
						}))
						.catch(err => next(err))
				} else {
					res.send({
						user: user._id,
						token: user.token
					})
				}
			} else {
				next()
			}
		})
})

router.post('/verify', auth, (req, res, next) => {
	User.findById(req.user._id)
		.select('authy')
		.select('+token')
		.exec((err, user) => {
			if (err) {
				return next(err)
			}

			authy.verify(user.authy.id, req.body.token)
				.then(() => res.send({
					user: user._id,
					token: user.token
				}))
				.catch(err => next(err))
		})
})

export default router
