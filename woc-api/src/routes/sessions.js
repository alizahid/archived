import express from 'express'

import User from '../models/user'

import auth from '../core/auth'
import hash from '../core/hash'
import json from '../core/json'

const router = express.Router()

router.post('/', (req, res, next) => {
	User.findOne()
		.where('email').eq(req.body.email)
		.select('+password')
		.select('+token')
		.exec()
		.then(user => {
			if (user) {
				let password = hash.password(req.body.password)

				if (user.password === password) {
					res.send({
						user: user._id,
						token: user.token
					})

					user.device = req.body.device

					if (user.isModified()) {
						user.save()
					}
				} else {
					let err = new Error('Incorrect password')
					err.status = 403

					next(err)
				}
			} else {
				let err = new Error('Incorrect email address')
				err.status = 403

				next(err)
			}
		})
		.catch(err => next(err))
})

router.delete('/', auth.user, (req, res, next) => {
	req.user.device = null

	if (req.user.isModified()) {
		req.user.save()
			.then(() => json(res, 'message', 'Logged out'))
			.catch(err => next(err))
	} else {
		json(res, 'message', 'Logged out')
	}
})

export default router
