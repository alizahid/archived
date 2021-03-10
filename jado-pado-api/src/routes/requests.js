import express from 'express'

import Request from '../models/request'

import auth from '../core/auth'

const router = express.Router()

router.get('/', auth, (req, res, next) => {
	Request.find()
		.where('user').eq(req.user._id)
		.sort('-created')
		.exec((err, requests) => {
			if (err) {
				return next(err)
			}

			res.send({
				requests: requests
			})
		})
})

export default router
