import express from 'express'

import Message from '../models/message'

import auth from '../core/auth'
import json from '../core/json'

const router = express.Router()

router.post('/', auth.user, (req, res, next) => {
	let message = new Message(req.body.message)

	message.save()
		.then(message => json(res, 'message', message))
		.catch(err => next(err))
})

router.get('/', auth.admin, (req, res, next) => {
	Message.find()
		.sort('-created')
		.exec()
		.then(messages => json(res, 'messages', messages))
		.catch(err => next(err))
})

router.get('/:id', auth.admin, (req, res, next) => {
	Message.findById(req.params.id)
		.exec()
		.then(message => json(res, 'message', message))
		.catch(err => next(err))
})

router.delete('/:id', auth.admin, (req, res, next) => {
	Message.findByIdAndRemove(req.params.id, req.body.message)
		.exec()
		.then(() => json(res, 'message', 'Message removed'))
		.catch(err => next(err))
})

export default router
