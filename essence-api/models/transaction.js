const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	user: mongoose.Schema.Types.ObjectId,
	type: String,
	amount: Number,
	token: String,
	created: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('Transaction', schema);
