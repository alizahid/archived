// new relic

if (!process.env.DEBUG) {
	require('newrelic')
}

// dotenv

if (process.env.DEBUG) {
	require('dotenv').config()
}

// require

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

// init

const app = express()

// setup

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(cors())

// routes

let routes = require('./routes/index')
let messenger = require('./routes/messenger')

app.use('/', routes)
app.use('/messenger', messenger)

// errors

app.use((req, res, next) => {
	let err = new Error('Not Found')
	err.status = 404

	next(err)
})

if (app.get('env') === 'development') {
	app.use((err, req, res, next) => {
		console.log(err)

		next(err)
	})
}

app.use((err, req, res, next) => {
	res.status(err.status || 500).send({
		message: err.message,
		error: {}
	})
})

module.exports = app
