const express = require('express')
const request = require('request')

const messenger = require('../lib/messenger')

const router = express.Router()

router.get('/', (req, res) => messenger.verify(req, res))

router.get('/hello', (req, res) => res.sendStatus(200))

router.get('/setup', (req, res) => {
	messenger.setup()
		.then(data => res.send(data))
		.catch(err => next(err))
})

router.post('/', function(req, res) {
	req.body.entry.forEach(entry => {
		entry.messaging.forEach(event => {
			messenger.received(event)
		})
	})

	res.sendStatus(200)
})

module.exports = router
