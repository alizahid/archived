import express from 'express'

import Discount from '../models/discount'
import Place from '../models/place'

import auth from '../core/auth'
import json from '../core/json'

const router = express.Router()

router.post('/', auth.admin, (req, res, next) => {
	let discount = new Discount(req.body.discount)

	discount.save()
		.then(discount => json(res, 'discount', discount))
		.catch(err => next(err))
})

router.get('/', auth.user, (req, res, next) => {
	if (req.query.swLat && req.query.swLng && req.query.neLat && req.query.neLng) {
		let query = {
			location: {
				$geoWithin: {
					$box: [
						[req.query.swLng, req.query.swLat],
						[req.query.neLng, req.query.neLat]
					]
				}
			}
		}

		let places = []

		Place.find(query)
			.exec()
			.then(data => places = data)
			.then(() => Discount.find()
				.where('place').in(places.map(place => place._id))
				.exec())
			.then(discounts => {
				res.send({
					discounts: discounts,
					places: places
				})
			})
			.catch(err => console.error(err))

		return
	}

	const LIMIT = parseInt(process.env.ITEMS_PER_PAGE)
	const PAGE = req.query.page || 0

	let count = Discount.count()
	let queryDiscounts = Discount.find()
	let queryPlaces = Place.find()

	if (req.query.airline) {
		count.where('airline').eq(req.query.airline)
		queryDiscounts.where('airline').eq(req.query.airline)
	}

	if (req.query.airline) {
		count.where('category').eq(req.query.category)
		queryDiscounts.where('category').eq(req.query.category)
	}

	queryDiscounts
		.sort('-created')
		.skip(PAGE * LIMIT)
		.limit(LIMIT)

	let total = 0
	let discounts = []

	count
		.then(count => total = count)
		.then(() => queryDiscounts)
		.then(data => discounts = data)
		.then(() => queryPlaces.where('_id').in(discounts.map(discount => discount.place)))
		.then(places => {
			res.send({
				discounts: discounts,
				places: places,
				meta: {
					total_pages: Math.ceil(total / LIMIT)
				}
			})
		})
		.catch(err => next(err))
})

router.get('/:id', auth.user, (req, res, next) => {
	let discount

	Discount.findById(req.params.id)
		.exec()
		.then(data => discount = data)
		.then(() => Place.findById(discount.place))
		.then(place => {
			res.send({
				discount: discount,
				place: place
			})
		})
		.catch(err => next(err))
})

router.put('/:id', auth.admin, (req, res, next) => {
	Discount.findByIdAndUpdate(req.params.id, req.body.discount)
		.exec()
		.then(discount => json(res, 'discount', discount))
		.catch(err => next(err))
})

export default router
