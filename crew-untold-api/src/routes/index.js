import express from 'express'

import auth from '../core/auth'
import url from '../core/url'

const router = express.Router()

router.get('/', (req, res) => res.redirect('http://crewuntold.com'))

router.post('/url', auth.user, (req, res, next) => {
	if (req.body.url) {
		url(req.body.url)
			.then(short =>
				res.send({
					short
				})
			)
			.catch(err => next(err))
	} else {
		next()
	}
})

export default router
