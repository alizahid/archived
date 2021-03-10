import mongoose from 'mongoose'

const schema = new mongoose.Schema({
	name: String,
	created: {
		type: Date,
		default: Date.now,
		select: false
	}
})

const model = mongoose.model('Category', schema)

export default model
