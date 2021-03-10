import mongoose from 'mongoose'

const schema = new mongoose.Schema({
	name: String,
	email: {
		type: String,
		index: true,
		unique: true,
		select: false
	},
	phone: {
		type: mongoose.Schema.Types.Mixed,
		default: {
			code: String,
			number: String
		}
	},
	password: {
		type: String,
		select: false
	},
	authy: {
		type: mongoose.Schema.Types.Mixed,
		select: false
	},
	token: {
		type: String,
		select: false
	}
})

schema.set('toJSON', {
	transform(doc, ret) {
		delete ret.password
		delete ret.__v
	}
})

const model = mongoose.model('User', schema)

export default model
