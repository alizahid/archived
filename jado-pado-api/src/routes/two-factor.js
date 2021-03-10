import express from 'express'

import User from '../models/user'

import auth from '../core/auth'
import authy from '../core/authy'

const router = express.Router()

router.post('/', auth, (req, res, next) => {
	User.findById(req.user._id)
		.select('authy')
		.exec((err, user) => {
			if (err) {
				return next(err)
			}

			if (authy.twoFactor) {
				res.send({
					message: 'You already have Two Factor Authentication enabled'
				})
			} else {
				authy.request(user.authy.id)
					.then(() => res.send({}))
					.catch(err => next(err))
			}
		})
})

router.delete('/', auth, (req, res, next) => {
	User.findByIdAndUpdate(req.user._id, {
		'authy.twoFactor': false
	}, err => {
		if (err) {
			return next(err)
		}

		res.send({})
	})
})

router.post('/verify', auth, (req, res, next) => {
	User.findById(req.user._id)
		.select('authy')
		.exec((err, user) => {
			if (err) {
				return next(err)
			}

			if (authy.twoFactor) {
				res.send({
					message: 'You already have Two Factor Authentication enabled'
				})
			} else {
				authy.verify(user.authy.id, req.body.token)
					.then(() => {
						user.authy.twoFactor = true

						user.markModified('authy')

						user.save(err => {
							if (err) {
								return next(err)
							}

							res.send({})
						})
					})
					.catch(err => next(err))
			}
		})
})

export default router
