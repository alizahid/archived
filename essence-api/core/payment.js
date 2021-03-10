const User = require('../models/user'),
	Transaction = require('../models/transaction');

const paypal = require('./paypal');

module.exports = {
	create(user, amount, description) {
		return new Promise((resolve, reject) => {
			User.findById(user, 'payment', (err, user) => {
				if (err) {
					return reject(err);
				}

				if (user.payment.token) {
					let data = {
						intent: 'sale',
						payer: {
							payment_method: 'credit_card',
							funding_instruments: [{
								credit_card_token: {
									credit_card_id: user.payment.token,
									payer_id: user._id
								}
							}]
						},
						transactions: [{
							amount: {
								total: amount,
								currency: process.env.CURRENCY
							},
							description: description
						}]
					};

					paypal.payment.create(data, (err, paypal) => {
						if (err) {
							return reject(err);
						}

						resolve({
							amount: amount,
							paypal: paypal,
							user: user
						});
					});
				} else {
					let error = new Error('No card on file');
					error.status = 400;

					reject(error);
				}
			});
		});
	},
	transaction(data, type) {
		return new Promise((resolve, reject) => {
			let transaction = new Transaction();

			transaction.user = data.user._id;
			transaction.type = type;
			transaction.amount = data.amount;
			transaction.token = data.paypal.id;

			transaction.save((err, transaction) => {
				if (err) {
					return reject(err)
				}

				resolve(transaction);
			});
		});
	}
};
