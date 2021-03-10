import dotenv from 'dotenv/config'

import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import logger from 'morgan'
import cors from 'cors'

import mongoose from 'mongoose'

mongoose.Promise = Promise

mongoose.connect(process.env.MONGODB_URI, err => {
	if (err) throw err
})

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())

import routes from './routes/index'
import airlines from './routes/airlines'
import categories from './routes/categories'
import discounts from './routes/discounts'
import messages from './routes/messages'
import sessions from './routes/sessions'
import users from './routes/users'

app.use('/', routes)
app.use('/v1/airlines', airlines)
app.use('/v1/categories', categories)
app.use('/v1/discounts', discounts)
app.use('/v1/messages', messages)
app.use('/v1/sessions', sessions)
app.use('/v1/users', users)

app.use((req, res, next) => {
	let err = new Error('Not found')
	err.status = 404

	next(err)
})

app.use((err, req, res, next) => {
	res.status(err.status || 500)

	res.send({
		errors: {
			message: err.message
		}
	})
})

export default app
