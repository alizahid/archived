import mongoose from 'mongoose'

const invite = new mongoose.Schema({
	email: {
		type: String
	},
	status: {
		default: 'invited',
		type: String
	},
	created: {
		default: Date.now,
		type: Date
	},
	joined: Date
})

const schema = new mongoose.Schema({
	user: {
		index: true,
		type: mongoose.Schema.Types.ObjectId
	},
	code: {
		index: true,
		type: String
	},
	invites: [invite]
})

schema.set('toJSON', {
	transform(doc, ret) {
		delete ret.invites
	}
})

const model = mongoose.model('Invite', schema)

export default model
