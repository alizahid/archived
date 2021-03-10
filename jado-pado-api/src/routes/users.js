import express from 'express'
import isEmail from 'validator/lib/isEmail'
import passwordHash from 'password-hash'

import User from '../models/user'

import auth from '../core/auth'
import authy from '../core/authy'
import hash from '../core/hash'

const router = express.Router()

router.post('/', (req, res, next) => {
	if (isEmail(req.body.email)) {
		let user = new User()

		user.name = req.body.name
		user.email = req.body.email
		user.phone = req.body.phone
		user.password = passwordHash.generate(req.body.password)
		user.token = hash.token(req.body.name, req.body.email)

		user.save(err => {
			if (err) {
				if (err.code === 11000 && err.message.indexOf('email_1 dup key') >= 0) {
					err.message = 'Email already in use'
				}

				return next(err)
			}

			authy.register(user.email, user.phone.number, user.phone.code)
				.then(data => {
					user.authy = {
						id: data.user.id
					}

					user.save(err => {
						if (err) {
							return next(err)
						}

						res.send({
							user: user._id,
							token: user.token
						})
					})
				})
				.catch(err => next(err))
		})
	} else {
		let err = new Error('Invalid email')

		next(err)
	}
})

router.get('/:id', auth, (req, res, next) => {
	User.findById(req.params.id)
		.select('+email')
		.select('+authy')
		.exec((err, user) => {
			if (err) {
				return next(err)
			}

			res.send({
				user: user
			})
		})
})

export default router
