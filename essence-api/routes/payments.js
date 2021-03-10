const express = require('express'),
	router = express.Router();

const User = require('../models/user'),
	Transaction = require('../models/transaction');

const auth = require('../core/auth'),
	paypal = require('../core/paypal'),
	payment = require('../core/payment');

router.get('/:id', auth, (req, res, next) => {
	User.findById(req.user._id, 'payment', (err, user) => {
		if (err) {
			return next(err);
		}

		user.payment._id = user._id;

		res.send({
			payment: user.payment
		});
	});
});

router.post('/card', auth, (req, res, next) => {
	User.findById(req.user._id, 'name email payment', (err, user) => {
		if (err) {
			return next(err);
		}

		let update = (err, data) => {
			if (err) {
				return next(err);
			}

			user.payment.token = data.id;
			user.payment.last4 = req.body.number.substr(-4);
			user.payment.expiry = req.body.expiry;

			user.markModified('payment');

			user.save((err) => {
				if (err) {
					return next(err);
				}

				res.send({});
			});
		};

		let create = (id, card, callback) => {
			paypal.creditCard.create({
				type: card.type,
				number: card.number,
				expire_month: card.expiry.month,
				expire_year: card.expiry.year,
				cvv2: card.code,
				external_customer_id: user._id
			}, callback);
		};

		if (user.payment.token) {
			paypal.creditCard.delete(user.payment.token, (err) => {
				if (err) {
					return next(err);
				}

				create(user._id, req.body, update);
			});
		} else {
			create(user._id, req.body, update);
		}
	});
});

router.post('/upgrade', auth, (req, res, next) => {
	payment.create(req.user._id, process.env.PREMIUM_PRICE, 'Premium upgrade for ' + req.user.email).then((data) => {
		payment.transaction(data, 'upgrade').then(() => {
			data.user.payment.premium = true;

			data.user.markModified('payment');

			data.user.save((err) => {
				if (err) {
					return next(err);
				}

				res.send({});
			});
		}, (err) => {
			next(err);
		})
	}, (err) => {
		next(err);
	});
});

module.exports = router;
