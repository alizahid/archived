import express from 'express'

import User from '../models/user'
import Request from '../models/request'

import auth from '../core/auth'
import oneTouch from '../core/one-touch'

const router = express.Router()

router.post('/', auth, (req, res, next) => {
	User.findById(req.user._id)
		.select('authy')
		.exec((err, user) => {
			if (err) {
				return next(err)
			}

			oneTouch.request(user.authy.id, {
					message: req.body.message
				})
				.then(data => {
					let request = new Request()

					request.user = req.user._id
					request.uuid = data.approval_request.uuid
					request.status = 'pending'

					request.save(err => {
						if (err) {
							return next(err)
						}

						res.send({})
					})
				})
				.catch(err => next(err))
		})
})

router.post('/callback', (req, res, next) => {
	if (req.body.authy_id === '1234') {
		return res.send();
	}

	oneTouch.verify(req)
		.then(Request.updateStatus(req.body.uuid, req.body.status))
		.then(() => res.send())
		.catch(err => next(err))
})

export default router
