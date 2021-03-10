var PlanX = require('../plan-x/plan-x');

var User = require('../models/user');

exports.login = function (req, res) {
	User.findOne({
		email: req.body.email
	}, 'password token', function (err, user) {
		if (err) {
			return res.status(500).send(err);
		}

		if (!user) {
			return res.status(404).send({});
		}

		var password = require('crypto').createHash('sha256').update(req.body.password).digest('hex');

		if (user.password !== password) {
			return res.status(401).send({});
		}

		res.send({
			user: user._id,
			token: user.token
		});
	});
};

exports.logout = function (req, res) {
	req.user.logout();

	res.send({});
};

exports.verify = function (req, res) {
	var failed = function (status) {
		PlanX.renderTemplate('verification-failed', null, function (html) {
			res.status(status).send(html);
		});
	};

	User.findById(req.params.id, function (err, user) {
		if (err) {
			return failed(500);
		}

		if (!user) {
			return failed(404);
		}

		var which;

		if (user.verification.phone.code === req.params.code) {
			which = 'phone';

			user.verification.phone = {
				verified: true,
				code: null
			};
		} else if (user.verification.email.code === req.params.code) {
			which = 'email';

			user.verification.email = {
				verified: true,
				code: null
			};
		}

		if (!which) {
			return failed(404);
		}

		user.markModified('verification');

		user.save(function (err) {
			if (err) {
				return failed(500);
			}

			PlanX.renderTemplate('verification-success', {
				which: which
			}, function (html) {
				res.send(html);
			});
		});
	});
};
