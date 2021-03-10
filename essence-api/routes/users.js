const express = require('express'),
	router = express.Router();

const User = require('../models/user');

const shortid = require('shortid');

const auth = require('../core/auth'),
	hash = require('../core/hash'),
	email = require('../core/email');

router.get('/', auth, (req, res, next) => {
	User.find()
		.where('gas').elemMatch({
			quantity: {
				$gt: 0
			}
		})
		.where('_id').ne(req.user._id)
		.where('location').ne(null)
		.exec((err, users) => {
			if (err) {
				return next(err);
			}

			let data = {};

			data[req.key.plural] = users || [];

			res.send(data);
		});
});

router.get('/:id', auth, (req, res, next) => {
	let fields = 'name gas location premium';

	if (req.user._id.equals(req.params.id)) {
		fields += ' email phone';
	}

	User.findById(req.params.id, fields, (err, user) => {
		if (err) {
			return next(err);
		}

		let data = {};

		data[req.key.singular] = user;

		res.send(data);
	});
});

router.post('/', (req, res, next) => {
	if (req.body.name && req.body.email && req.body.password) {
		let user = new User();

		user.name = req.body.name;
		user.email = req.body.email;
		user.password = hash(req.body.password);

		user.token = hash(user.name + user.email + Date.now());

		user.save((err, user) => {
			if (err) {
				let error = new Error('Email address in use');
				error.status = 400;

				return next(error);
			}

			res.send({
				user: user._id,
				token: user.token
			});
		});
	}
});

router.put('/:id', auth, (req, res, next) => {
	if (req.body.user.phone) {
		req.user.phone = req.body.user.phone;
	}

	if (req.body.user.location) {
		req.user.location = req.body.user.location;
	}

	if (req.body.user.gas) {
		req.user.gas = req.body.user.gas;
	}

	if (req.user.isModified()) {
		req.user.save((err) => {
			if (err) {
				return next(err);
			}

			res.send({});
		});
	} else {
		res.send({});
	}
});

router.post('/login', (req, res, next) => {
	User.findOne({
		email: req.body.email
	}, 'email password token', (err, user) => {
		if (err) {
			return next(err);
		}

		if (user) {
			let password = hash(req.body.password);

			if (user.password === password) {
				res.send({
					user: user._id,
					token: user.token
				});
			} else {
				let error = new Error('Incorrect password');
				error.status = 401;

				next(error);
			}
		} else {
			let error = new Error('Email address not found');
			error.status = 404;

			next(error);
		}
	});
});

router.post('/reset', (req, res, next) => {
	User.findOne({
		email: req.body.email
	}, 'name email codes', (err, user) => {
		if (err) {
			return next(err);
		}

		if (user) {
			if (!user.reset) {
				user.reset = shortid.generate();
			}

			let send = () => {
				email.send(user.email, {
					name: user.name,
					code: user.reset
				}, email.templates.RESET).then(() => {
					res.send({
						message: 'Password reset link sent to your email'
					});
				}, () => {
					next(new Error());
				});
			};

			if (user.isModified()) {
				user.save((err) => {
					if (err) {
						return next(err);
					}

					send({});
				});
			} else {
				send({});
			}
		} else {
			let error = new Error('Email address not found');
			error.status = 404;

			next(error);
		}
	});
});

router.post('/password', auth, (req, res, next) => {
	User.findById(req.user._id, 'password', (err, user) => {
		if (err) {
			return next(err);
		}

		if (user) {
			let password = hash(req.body.password);

			if (user.password === password) {
				user.password = hash(req.body.newPassword);

				user.save((err) => {
					if (err) {
						return next(err);
					}

					res.send({});
				});
			} else {
				let error = new Error('Incorrect password');
				error.status = 401;

				next(error);
			}
		}
	});
});

module.exports = router;
