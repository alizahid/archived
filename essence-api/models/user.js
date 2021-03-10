const mongoose = require('mongoose');

const gas = require('./gas');

const schema = new mongoose.Schema({
	name: String,
	email: {
		type: String,
		index: true,
		unique: true,
		select: false
	},
	password: {
		type: String,
		select: false
	},
	phone: {
		type: String,
		select: false
	},
	location: {
		type: [Number],
		index: '2d'
	},
	gas: [gas],
	payment: {
		type: mongoose.Schema.Types.Mixed,
		select: false,
		default: {
			premium: false
		}
	},
	premium: {
		type: Boolean,
		default: false
	},
	reset: {
		type: String,
		select: false
	},
	token: {
		type: String,
		index: true,
		unique: true,
		select: false
	},
	joined: {
		type: Date,
		default: Date.now,
		select: false
	},
});

schema.pre('save', function(next) {
	if (this.payment && this.payment.premium) {
		this.premium = this.payment.premium;

		next();
	} else {
		next();
	}
});

module.exports = mongoose.model('User', schema);
