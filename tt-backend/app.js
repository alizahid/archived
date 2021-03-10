const express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

let routes = require('./routes/index');

app.use('/', routes);

app.use((req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;

	next(err);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);

	res.send({
		message: err.message
	});
});

module.exports = app;
