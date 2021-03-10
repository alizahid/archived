import express from 'express'

import User from '../models/user'

import auth from '../core/auth'
import hash from '../core/hash'

const router = express.Router()

router.post('/', (req, res, next) => {
	User.findOne()
		.where('email').eq(req.body.email)
		.select('email password token')
		.exec()
		.then(user => {
			if (!user) {
				return next()
			}

			if (user.password === hash.password(req.body.password)) {
				user.device = req.body.device

				user.save()

				res.send({
					id: user._id,
					token: user.token
				})
			} else {
				let err = new Error(`Incorrect password`)
				err.status = 400

				next(err)
			}
		})
		.catch(err => next(err))
})

router.delete('/', auth.user, (req, res, next) => {
	delete req.user.device

	req.user.save()
		.then(() => res.send({}))
		.catch(err => next(err))
})

router.post('/admin', (req, res, next) => {
	User.findOne()
		.where('email').eq(req.body.email)
		.select('email password token role')
		.exec()
		.then(user => {
			if (!user) {
				return next()
			}

			if (user.password !== hash.password(req.body.password)) {
				let err = new Error('Incorrect password')
				err.status = 401

				return next(err)
			}

			if (user.role !== 'admin') {
				let err = new Error()
				err.status = 403

				return next(err)
			}

			res.send(user)
		})
		.catch(err => next(err))
})

export default router
