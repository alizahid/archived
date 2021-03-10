import express from 'express'

import User from '../models/user'
import Invite from '../models/invite'

import auth from '../core/auth'
import hash from '../core/hash'
import json from '../core/json'

const router = express.Router()

router.post('/', (req, res, next) => {
	let invite

	Invite.findOne({
		code: {
			$regex: new RegExp(req.body.user.code, 'i')
		}
	})
		.then(data => {
			invite = data

			if (!invite) {
				let err = new Error(`Invalid invite code`)
				err.status = 404

				throw err
			}

			let user = new User()

			user.email = req.body.user.email
			user.password = hash.password(req.body.user.password)
			user.token = hash.token()
			user.device = req.body.user.device
			user.notifications = req.body.user.device && req.body.user.device.token && true || false

			return user.save()
		})
		.then(user => {
			json(res, 'user', user)

			let used = invite.invites.find(invite => invite.email === user.email)

			if (used) {
				used.joined = Date.now()
				used.status = 'joined'
			} else {
				invite.invites.push({
					email: user.email,
					joined: Date.now(),
					status: 'joined'
				})
			}

			invite.markModified('invites')

			invite.save()
		})
		.catch(err => {
			if (err.code === 11000) {
				err = new Error(`Email in use`)
				err.status = 400
			}

			next(err)
		})
})

router.get('/:id', auth.user, (req, res, next) => {
	if (req.user._id.equals(req.params.id)) {
		res.send({
			user: req.user
		})
	} else {
		next()
	}
})

router.put('/:id', auth.user, (req, res, next) => {
	req.user.notifications = req.body.user.notifications
	req.user.device = req.body.user.device

	if (req.user.isModified()) {
		req.user.save((err, user) => {
			if (err) {
				return next(err)
			}

			res.send({
				user
			})
		})
	} else {
		res.send({
			user: req.user
		})
	}
})

router.post('/:id/block', auth.user, (req, res, next) => {
	if (req.user._id.equals(req.params.id)) {
		let err = new Error(`You can't block yourself`)
		err.status = 400

		return next(err)
	}

	if (req.user.blocked.indexOf(req.params.id) < 0) {
		req.user.blocked.push(req.params.id)

		req.user.markModified('blocked')

		req.user.save()
			.then(() => {
				res.send({
					message: `This user is now blocked, and you won't be seeing any posts from them again`
				})
			})
			.catch(err => next(err))
	} else {
		let err = new Error(`You've already blocked this user`)
		err.status = 400

		next(err)
	}
})

export default router
