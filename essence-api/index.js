// new relic

// require('newrelic');

// require

const express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors');

const mongoose = require('mongoose');

// init

const app = express();

// dotenv

if (app.get('env') === 'development') {
	require('dotenv').config();
}

// database

mongoose.connect(process.env.MONGOHQ_URL, (err) => {
	if (err) throw err;
});

// setup

app.use(bodyParser.json());
app.use(cors());

// routes

let routes = require('./routes/index'),
	orders = require('./routes/orders'),
	users = require('./routes/users'),
	payments = require('./routes/payments');

let key = (req, res, next) => {
	if (req.originalUrl.indexOf('/sellers') === 0) {
		req.key = {
			singular: 'seller',
			plural: 'sellers',
		};
	} else if (req.originalUrl.indexOf('/users') === 0) {
		req.key = {
			singular: 'user',
			plural: 'users',
		};
	}

	next();
};

app.use('/', routes);
app.use('/orders', orders);
app.use('/users', key, users);
app.use('/sellers', key, users);
app.use('/payments', payments);

// error

app.use((req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;

	next(err);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500).send({
		message: err.message || 'Something went wrong'
	});
});

module.exports = app;
