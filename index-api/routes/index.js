const express = require('express')

const shortid = require('shortid')

const stringify = require('../lib/stringify')
const parse = require('../lib/parse')
const download = require('../lib/download')
const upload = require('../lib/upload')
const email = require('../lib/email')

const router = express.Router()

router.get('/', (req, res) => res.redirect('https://designplox.com/index/'))

router.post('/export', (req, res, next) => {
	if (req.body.email && req.body.data) {
		let id = shortid.generate(),
			data = JSON.stringify(req.body.data)

		upload(id, data)
			.then(link => email(req.body.email, id, link))
			.then(link =>
				res.send({
					id
				})
			)
			.catch(err => next(err))
	} else {
		let err = new Error()
		err.status = 403

		next(err)
	}
})

router.get('/download/:id', (req, res, next) => {
	download(req.params.id)
		.then(data => JSON.parse(data).item)
		.then(data =>
			data.map(item => {
				delete item.id
				delete item.account

				return item
			})
		)
		.then(data => stringify(data))
		.then(data => {
			let csv = new Buffer(data)

			res.setHeader('Content-disposition', 'attachment filename=index-export.csv')

			res.send(csv)
		})
		.catch(err => next(err))
})

router.get('/import/:id', (req, res, next) => {
	download(req.params.id)
		.then(data => JSON.parse(data))
		.then(data => res.send(data))
		.catch(err => next(err))
})

module.exports = router
