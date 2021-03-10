import express from 'express'

import User from '../models/user'

import auth from '../core/auth'
import hash from '../core/hash'
import json from '../core/json'

const router = express.Router()

router.post('/', (req, res, next) => {
	let user = new User(req.body.user)

	user.password = hash.password(req.body.user.password)
	user.token = hash.random()

	user.save()
		.then(user => json(res, 'user', user))
		.catch(err => {
			if (err.code === 11000) {
				err.status = 400

				if (err.message.indexOf('email_1') >= 0) {
					err.message = 'Email address already in use';
				} else if (err.message.indexOf('facebookId_1') >= 0) {
					err.message = 'Facebook account already in use';
				} else if (err.message.indexOf('phone_1') >= 0) {
					err.message = 'Phone number already in use';
				}
			}

			next(err)
		})
})

router.get('/:id', auth.user, (req, res, next) => {
	if (req.user._id.equals(req.params.id)) {
		json(res, 'user', req.user)
	} else {
		next()
	}
})

router.put('/:id', auth.user, (req, res, next) => {
	User.findByIdAndUpdate(req.user._id, req.body.user)
		.exec()
		.then(user => json(res, 'user', user))
		.catch(err => next(err))
})

export default router
