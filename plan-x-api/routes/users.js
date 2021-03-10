var PlanX = require('../plan-x/plan-x'),
	push = require('../plan-x/push');

var User = require('../models/user');

var postmark = require('postmark')(process.env.POSTMARK_API_KEY),
	twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN),
	randomstring = require('randomstring');

exports.create = function (req, res) {
	if (!req.body.name || !req.body.email || !req.body.password || !req.body.photo) {
		return res.status(400).send({});
	}

	var user = new User();

	user.name = req.body.name;
	user.about = req.body.about;
	user.email = req.body.email;
	user.password = require('crypto').createHash('sha256').update(req.body.password).digest('hex');

	if (req.body.photo.indexOf('http') === 0) {
		user.photo = req.body.photo;
	}

	if (req.body.phone) {
		user.phone = req.body.phone;
	}

	user.token = require('crypto').createHash('sha256').update(req.body.name + req.body.phone + req.body.email + Date.now()).digest('hex');

	if (req.body.device) {
		user.device = {
			type: req.body.device.type,
			token: req.body.device.token
		};
	}

	user.verification = {
		phone: {
			code: randomstring.generate(5),
			verified: false
		},
		email: {
			code: randomstring.generate(5),
			verified: false
		}
	};

	user.save(function (err) {
		if (err) {
			return res.status(400).send({
				error: 'Email or phone number already exists'
			});
		}

		res.status(201).send({
			user: user._id,
			token: user.token
		});

		if (!user.photo) {
			PlanX.uploadPhoto(user._id, req.body.photo, 0, function (url) {
				if (url) {
					user.photo = url;

					user.save();
				}
			});
		}

		if (user.phone) {
			twilio.sendMessage({
				body: 'Welcome to Plan X. Click here to verify; https://planx.me/v/' + user._id + '/' + user.verification.phone.code,
				to: user.phone,
				from: process.env.TWILIO_NUMBER
			}, function (err, data) {
				if (err) {
					console.error('twilio', err);
				} else {
					console.log('twilio', data);
				}
			});
		}

		if (user.email) {
			PlanX.renderTemplate('new-user', {
				user: user._id,
				code: user.verification.email.code
			}, function (html) {
				postmark.sendEmail({
					From: process.env.POSTMARK_EMAIL,
					To: user.email,
					Subject: 'Welcome to Plan X',
					HtmlBody: html,
					Tag: 'new-user'
				}, function (err, data) {
					if (err) {
						console.error('postmark', err);
					} else {
						console.log('postmark', data);
					}
				});
			});
		}
	});
};

exports.fetch = function (req, res) {
	User.findById(req.params.id, function (err, user) {
		if (err) {
			return res.status(500).send(err);
		}

		if (!user) {
			return res.status(404).send({});
		}

		res.send({
			user: user.toJSON({
				isLoggedInUser: req.user._id.equals(user._id)
			})
		});
	});
};

exports.update = function (req, res) {
	var changed;

	var callback = function (err, user) {
		if (err) {
			return res.status(500).send(err);
		}

		if (!user) {
			return res.status(404).send({});
		}

		res.send({
			user: user
		});
	};

	if (req.body.device) {
		req.user.device = {
			type: req.body.device.type,
			token: req.body.device.token
		};

		req.user.save(callback);
	} else {
		if (req.body.user.about !== req.user.about) {
			req.user.about = req.body.user.about;
		}

		if (req.body.user.gender !== req.user.gender) {
			req.user.gender = req.body.user.gender;
		}

		if (req.body.user.birthday !== req.user.birthday) {
			req.user.birthday = req.body.user.birthday;
		}

		if (req.user.photo !== req.body.user.photo) {
			var version = 0,
				regexp = req.user.photo.match(/v=([0-9]+)/);

			if (regexp) {
				version = parseInt(regexp[1]);
			}

			PlanX.uploadPhoto(req.user._id, req.body.user.photo, version, function (url, err) {
				if (url) {
					req.user.photo = url;

					req.user.save(callback);
				} else {
					res.status(500).send(err);
				}
			});
		} else {
			req.user.save(callback);
		}
	}
}

exports.notifications = function (req, res) {
	var users = [];

	var notifications = req.user.notifications.map(function (notification) {
		users.push(notification.data.user.id);

		return {
			_id: notification._id,
			body: notification.body,
			action: notification.data.action,
			created: notification.created,
			target_type: notification.data.target.type,
			target_id: notification.data.target.id,
			read: notification.read,
			user: notification.data.user.id
		};
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
			notifications: notifications,
			users: users
		});
	});
};

exports.clearNotifications = function (req, res) {
	req.user.notifications = req.user.notifications.map(function (notification) {
		notification.read = true;

		return notification;
	});

	req.user.save(function (err) {
		if (!err) {
			push.setBadge(req.user.device, '0');
		}

		res.send({});
	});
};

exports.readNotification = function (req, res) {
	var notification = req.user.notifications.id(req.params.id);

	notification.read = true;

	req.user.save(function (err) {
		if (!err) {
			push.setBadge(req.user.device, '-1');
		}

		res.send({});
	});
};
