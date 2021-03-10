const express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	bodyParser = require('body-parser');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(require('node-sass-middleware')({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
}));
app.use(express.static(path.join(__dirname, 'public')));

let routes = require('./routes/index'),
	users = require('./routes/users');

app.use('/', routes);
app.use('/users', users);

app.use((req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;

	next(err);
});

if (app.get('env') === 'development') {
	app.use((err, req, res, next) => {
		res.status(err.status || 500);

		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

app.use((err, req, res, next) => {
	res.status(err.status || 500);

	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
