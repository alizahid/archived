import mongoose from 'mongoose'

const schema = new mongoose.Schema({
	name: String,
	email: {
		type: String,
		select: false,
		index: true,
		unique: true
	},
	password: {
		type: String,
		select: false
	},
	phone: {
		type: mongoose.Schema.Types.Mixed,
		default: {},
		select: false
	},
	gender: {
		type: String,
		enum: ['male', 'female', 'other']
	},
	birthday: Date,
	facebookId: {
		type: String,
		select: false,
		unique: true,
		sparse: true
	},
	created: {
		type: Date,
		default: Date.now,
		select: false
	},
	token: {
		type: String,
		select: false
	},
	device: {
		type: mongoose.Schema.Types.Mixed,
		default: {},
		select: false
	},
	role: {
		type: String,
		enum: ['admin', 'user'],
		default: 'user',
		select: false
	}
})

schema.set('toJSON', {
	transform(doc, ret) {
		delete ret.password
	}
})

const model = mongoose.model('User', schema)

export default model
