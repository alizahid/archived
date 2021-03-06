var express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	pg = require('pg');

var routes = require('./routes/index'),
	shows = require('./routes/shows'),
	deaths = require('./routes/deaths'),
	search = require('./routes/search'),
	add = require('./routes/add');

pg.connect(process.env.POSTGRES_URI, function (err, client, done) {
	if (err) throw err;

	db = client;
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.basedir = app.get('views');

app.use(favicon(__dirname + '/public/favicon/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower',  express.static(__dirname + '/bower_components'));

app.use('/', routes);
app.use('/shows', shows);
app.use('/deaths', deaths);
app.use('/search', search);
app.use('/add', add);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);

		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);

	res.render('error', {
		message: err.message,
		error: {}
	})
});

module.exports = app;