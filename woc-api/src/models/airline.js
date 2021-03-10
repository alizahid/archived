import mongoose from 'mongoose'

const schema = new mongoose.Schema({
	name: String,
	created: {
		type: Date,
		default: Date.now,
		select: false
	}
})

const model = mongoose.model('Airline', schema)

export default model
