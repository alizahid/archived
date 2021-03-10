var Event = require('../models/event'),
	User = require('../models/user');

var firstName = function (name) {
	return (name || '').split(' ')[0];
}

exports.create = function (req, res) {
	var event = new Event();

	event.user = req.user._id;
	event.description = req.body.event.description;
	event.tags = req.body.event.tags;

	event.when = req.body.event.when;
	event.where = req.body.event.where;

	event.attending.push(req.user._id);

	event.save(function (err, event) {
		if (err) {
			return res.status(400).send({});
		}

		res.status(201).send({
			event: event
		});
	});
};

exports.fetch = function (req, res) {
	Event.find().where('blocked').nin([req.user._id]).limit(50).sort('-created').exec(function (err, events) {
		if (err) {
			return res.send(err);
		}

		var users = [],
			comments = [];

		events.forEach(function (event) {
			if (event.attending.indexOf(req.user._id) >= 0) {
				event.attending.forEach(function (user) {
					users.push(user);
				});

				event.comments.forEach(function (comment) {
					comments.push(comment);
				});
			} else {
				users.push(event.user);

				event.comments = null;
				event.attending = null;

				event.when = null;
				event.where = null;

				if (event.requests.indexOf(req.user._id) >= 0) {
					event.requests = [req.user._id];
				} else {
					event.requests = null;
				}
			}
		});

		User.find({
			_id: {
				$in: users
			}
		}, function (err, users) {
			if (err) {
				return res.status(500).send(err);
			}

			res.send({
				events: events,
				users: users,
				comments: comments
			});
		});
	});
};

exports.fetchOne = function (req, res) {
	Event.findById(req.params.id, function (err, event) {
		if (err) {
			return res.status(500).send(err);
		}

		if (!event) {
			return res.status(404).send({});
		}

		if (event.blocked.indexOf(req.user._id) >= 0) {
			return res.status(403).send({});
		}

		if (event.attending.indexOf(req.user._id) >= 0) {
			var users = event.attending.reduce(function (users, user) {
				users.push(user);

				return users;
			}, []);

			User.find({
				_id: {
					$in: users
				}
			}, function (err, users) {
				if (err) {
					return res.status(500).send(err);
				}

				if (event.requests.indexOf(req.user._id) >= 0) {
					event.requests = [req.user._id];
				} else if (!req.user._id.equals(event.user)) {
					event.requests = null;
				}

				res.send({
					event: event,
					users: users,
					comments: event.comments
				});
			});
		} else {
			event.comments = null;
			event.attending = null;

			event.when = null;
			event.where = null;

			if (event.requests.indexOf(req.user._id) >= 0) {
				event.requests = [req.user._id];
			} else {
				event.requests = null;
			}

			res.send({
				event: event
			});
		}
	});
};

exports.update = function (req, res) {
	Event.findById(req.params.id, function (err, event) {
		if (err) {
			return res.status(500).send(err);
		}

		if (!event) {
			return res.status(404).send({});
		}

		if (!req.user._id.equals(event.user)) {
			return res.status(403).send({});
		}

		var attending;

		if (req.body.event.attending && req.body.event.attending.forEach) {
			attending = req.body.event.attending.filter(function (user) {
				return event.attending.indexOf(user) < 0;
			});

			event.attending = req.body.event.attending;
		}

		if (req.body.event.requests && req.body.event.requests.forEach) {
			event.requests = req.body.event.requests;
		}

		if (req.body.event.blocked && req.body.event.blocked.forEach) {
			event.blocked = req.body.event.blocked;
		}

		event.save(function (err) {
			if (err) {
				return res.status(500).send(err);
			}

			User.notify(attending, firstName(req.user.name) + ' accepted your request to join their event.', {
				action: 'accepted',
				target: {
					type: 'event',
					id: event._id
				},
				user: {
					id: req.user._id,
					name: req.user.name,
					photo: req.user.photo
				}
			});

			res.send({});
		})
	});
};

exports.join = function (req, res) {
	Event.findById(req.params.id, function (err, event) {
		if (err) {
			return res.status(500).send(err);
		}

		if (!event) {
			return res.status(404).send({});
		}

		if (event.blocked.indexOf(req.user._id) >= 0) {
			return res.status(403).send({});
		}

		if (event.attending.indexOf(req.user._id) >= 0 || event.requests.indexOf(req.user._id) >= 0) {
			return res.status(400).send({});
		}

		event.requests.push(req.user._id);

		event.save(function (err) {
			if (err) {
				return res.status(500).send(err);
			}

			User.notify(event.user, firstName(req.user.name) + ' requested to join your event.', {
				action: 'request',
				target: {
					type: 'event',
					id: event._id
				},
				user: {
					id: req.user._id,
					name: req.user.name,
					photo: req.user.photo
				}
			});

			res.status(201).send({});
		});
	});
}

exports.decline = function (req, res) {
	Event.findById(req.params.id, function (err, event) {
		if (err) {
			return res.status(500).send(err);
		}

		if (!event) {
			return res.status(404).send({});
		}

		if (!req.user._id.equals(event.user)) {
			return res.status(403).send({});
		}

		var requestIndex = event.requests.indexOf(req.params.user),
			attendingIndex = event.attending.indexOf(req.params.user);

		if (requestIndex >= 0 || attendingIndex >= 0) {
			if (requestIndex >= 0) {
				event.requests.splice(requestIndex, 1);
			}

			if (attendingIndex >= 0) {
				event.attending.splice(attendingIndex, 1);
			}

			event.blocked.push(req.params.user);

			event.save(function (err) {
				if (err) {
					return res.status(500).send(err);
				}

				res.send({});
			});
		} else {
			res.status(404).send({});
		}
	});
}

exports.comment = function (req, res) {
	Event.findById(req.body.comment.event, function (err, event) {
		if (err) {
			return res.status(500).send(err);
		}

		if (!event) {
			return res.status(404).send({});
		}

		if (event.attending.indexOf(req.user._id) >= 0) {
			var comment = event.comments.create({
				user: req.user._id,
				body: req.body.comment.body
			});

			event.comments.push(comment);

			event.save(function (err) {
				if (err) {
					return res.send(err);
				}

				res.status(201).send({
					comment: comment
				});

				var index = event.attending.indexOf(req.user._id);

				event.attending.splice(index, 1);

				if (event.attending.length > 0) {
					User.notify(event.attending, firstName(req.user.name) + ' commented on a event you have joined.', {
						action: 'comment',
						target: {
							type: 'event',
							id: event._id
						},
						user: {
							id: req.user._id,
							name: req.user.name,
							photo: req.user.photo
						}
					});
				}
			});
		} else {
			return res.status(403).send({});
		}
	});
};
