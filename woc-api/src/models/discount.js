import mongoose from 'mongoose'

const schema = new mongoose.Schema({
	category: {
		type: mongoose.Schema.Types.ObjectId,
		index: true
	},
	airline: {
		type: mongoose.Schema.Types.ObjectId,
		index: true
	},
	place: {
		type: mongoose.Schema.Types.ObjectId,
		index: true
	},
	description: String,
	discount: String,
	created: {
		type: Date,
		default: Date.now,
		index: true
	}
})

const model = mongoose.model('Discount', schema)

export default model
