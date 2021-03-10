const mongoose = require('mongoose'),
	shortid = require('shortid');

const gas = require('./gas');

const schema = new mongoose.Schema({
	_id: {
		type: String,
		default: shortid.generate
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		index: true
	},
	seller: mongoose.Schema.Types.ObjectId,
	items: [gas],
	status: String,
	created: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('Order', schema);
