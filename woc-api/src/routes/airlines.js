import express from 'express'

import Airline from '../models/airline'

import auth from '../core/auth'
import json from '../core/json'

const router = express.Router()

router.post('/', auth.admin, (req, res, next) => {
	let airline = new Airline(req.body.airline)

	airline.save()
		.then(airline => json(res, 'airline', airline))
		.catch(err => next(err))
})

router.get('/', auth.user, (req, res, next) => {
	Airline.find()
		.exec()
		.then(airlines => json(res, 'airlines', airlines))
		.catch(err => next(err))
})

router.get('/:id', auth.user, (req, res, next) => {
	Airline.findById(req.params.id)
		.exec()
		.then(airline => json(res, 'airline', airline))
		.catch(err => next(err))
})

router.put('/:id', auth.admin, (req, res, next) => {
	Airline.findByIdAndUpdate(req.params.id, req.body.airline)
		.exec()
		.then(airline => json(res, 'airline', airline))
		.catch(err => next(err))
})

export default router
