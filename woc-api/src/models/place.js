import mongoose from 'mongoose'

const schema = new mongoose.Schema({
	name: String,
	email: String,
	address: String,
	location: {
		type: [Number],
		index: '2d'
	},
	phone: String,
	image: String,
	created: {
		type: Date,
		default: Date.now,
		select: false
	}
})

const model = mongoose.model('Place', schema)

export default model
