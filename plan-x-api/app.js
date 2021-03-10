// newrelic

require('newrelic');

// dependencies

var express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	mongoose = require('mongoose');

// init app

var app = express();

app.use(bodyParser.urlencoded({
	extended: true,
	limit: '2mb'
}));

app.use(bodyParser.json({
	limit: '2mb'
}));

app.use(bodyParser.json());

app.use(cors());

// connect to database

mongoose.connect(process.env.MONGOHQ_URL, function (err) {
	if (err) {
		console.error(err);

		throw err;
	}
});

var PlanX = require('./plan-x/plan-x');

var auth = require('./routes/auth'),
	users = require('./routes/users'),
	events = require('./routes/events');

// "home"

app.get('/', function (req, res) {
	res.type('text/plain').send('Plan X API v1');
});

// auth

app.post('/v1/login', auth.login);
app.delete('/v1/logout', PlanX.auth, auth.logout);
app.get('/v1/verify/:id/:code', auth.verify);

// users

app.post('/v1/users', users.create);
app.get('/v1/users/:id', PlanX.auth, users.fetch);
app.put('/v1/users/:id', PlanX.auth, users.update);

// notifications

app.get('/v1/notifications', PlanX.auth, users.notifications);
app.delete('/v1/notifications', PlanX.auth, users.clearNotifications);
app.delete('/v1/notifications/:id', PlanX.auth, users.readNotification);

// events

app.post('/v1/events', PlanX.auth, events.create);
app.get('/v1/events', PlanX.auth, events.fetch);
app.get('/v1/events/:id', PlanX.auth, events.fetchOne);
app.put('/v1/events/:id', PlanX.auth, events.update);

app.post('/v1/events/:id/join', PlanX.auth, events.join);
app.delete('/v1/events/:id/decline/:user', PlanX.auth, events.decline);

app.post('/v1/comments', PlanX.auth, events.comment);

// start listening

app.listen(process.env.PORT, function () {
	console.log('Magic happens on ' + process.env.PORT);
});
