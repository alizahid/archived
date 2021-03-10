const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	type: String,
	quantity: Number,
	price: Number,
}, {
	_id: false
});
