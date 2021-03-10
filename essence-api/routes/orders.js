const express = require('express'),
	router = express.Router();

const Order = require('../models/order'),
	User = require('../models/user');

const auth = require('../core/auth'),
	payment = require('../core/payment');

const STATUS = {
	CREATED: 'created',
	COMPLETED: 'completed',
	REFUNDED: 'refunded',
};

router.get('/', auth, (req, res, next) => {
	Order.find()
		.where('user').eq(req.user._id)
		.exec((err, orders) => {
			if (err) {
				return next(err);
			}

			let users = orders.reduce((users, order) => {
				if (users.indexOf(order.seller) < 0) {
					users.push(order.seller);
				}
				return users;
			}, []);

			User.find()
				.where('_id').in(users)
				.select('name email phone location')
				.exec((err, users) => {
					if (err) {
						return next(err);
					}

					res.send({
						orders: orders || [],
						sellers: users || []
					});
				});
		});
});

router.get('/:id', auth, (req, res, next) => {
	Order.findById(req.params.id, (err, order) => {
		if (err) {
			return next(err);
		}

		if (order) {
			if (order.user.equals(req.user._id)) {
				User.findById(order.seller, 'name email phone location', (err, user) => {
					if (err) {
						return next(err);
					}

					res.send({
						order: order,
						seller: user
					});
				});
			} else {
				let error = new Error();
				error.status = 403;

				next(error);
			}
		} else {
			next();
		}
	});
});

router.post('/', auth, (req, res, next) => {
	User.findById(req.body.order.seller, 'gas', (err, seller) => {
		if (err) {
			return next(error);
		}

		let total = 0;

		let valid = req.body.order.items.every((item) => {
			return seller.gas.some((gas) => {
				if (item.type === gas.type && gas.quantity >= item.quantity) {
					total += item.quantity * gas.price;

					return true;
				}
			});
		});

		if (valid) {
			let order = new Order();

			order.user = req.user._id;
			order.seller = seller._id;
			order.items = req.body.order.items;
			order.status = STATUS.CREATED;

			order.save((err, order) => {
				if (err) {
					return next(error);
				}

				payment.create(req.user._id, total, 'Buying gas from ' + seller._id).then((data) => {
					payment.transaction(data, 'purchase').then(() => {
						res.status(201).send({
							order: order
						});
					}, (err) => {
						next(err);
					})
				}, (err) => {
					next(err);
				});
			});
		} else {
			let error = new Error();
			error.status = 400;

			next(error);
		}
	});
});

module.exports = router;
