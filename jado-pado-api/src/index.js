import dotenv from 'dotenv/config'

import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import logger from 'morgan'
import cors from 'cors'

import mongoose from 'mongoose'

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGO_URL, err => {
	if (err) throw err
})

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())

import routes from './routes/index'
import users from './routes/users'
import requests from './routes/requests'
import sessions from './routes/sessions'
import twoFactor from './routes/two-factor'
import oneTouch from './routes/one-touch'

app.use('/', routes)
app.use('/users', users)
app.use('/requests', requests)
app.use('/sessions', sessions)
app.use('/two-factor', twoFactor)
app.use('/one-touch', oneTouch)

app.use((req, res, next) => {
	let err = new Error('Not found')
	err.status = 404

	next(err)
})

app.use((err, req, res, next) => {
	res.status(err.status || 500)

	res.send({
		message: err.message
	})
})

export default app
