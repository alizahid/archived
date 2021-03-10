import express from 'express'

import Category from '../models/category'

import auth from '../core/auth'
import json from '../core/json'

const router = express.Router()

router.post('/', auth.admin, (req, res, next) => {
	let category = new Category(req.body.category)

	category.save()
		.then(category => json(res, 'category', category))
		.catch(err => next(err))
})

router.get('/', auth.user, (req, res, next) => {
	Category.find()
		.exec()
		.then(categories => json(res, 'categories', categories))
		.catch(err => next(err))
})

router.get('/:id', auth.user, (req, res, next) => {
	Category.findById(req.params.id)
		.exec()
		.then(category => json(res, 'category', category))
		.catch(err => next(err))
})

router.put('/:id', auth.admin, (req, res, next) => {
	Category.findByIdAndUpdate(req.params.id, req.body.category)
		.exec()
		.then(category => json(res, 'category', category))
		.catch(err => next(err))
})

export default router
