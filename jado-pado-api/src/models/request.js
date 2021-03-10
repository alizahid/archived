import mongoose from 'mongoose'

const schema = new mongoose.Schema({
	user: mongoose.Schema.Types.ObjectId,
	uuid: String,
	status: String,
	created: {
		type: Date,
		default: Date.now
	}
})

schema.set('toJSON', {
	transform(doc, ret) {
		delete ret.__v
	}
})

schema.statics.updateStatus = function(id, status) {
	return new Promise((resolve, reject) => {
		this.findOneAndUpdate({
			uuid: id
		}, {
			status: status
		}, err => {
			err ? reject(err) : resolve()
		})
	})
}

const model = mongoose.model('Request', schema)

export default model
