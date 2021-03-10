var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	user: String,
	description: String,
	tags: String,
	when: Date,
	where: String,
	comments: [{
		user: String,
		body: String,
		created: {
			type: Date,
			default: Date.now
		}
	}],
	attending: [String],
	requests: [String],
	blocked: [String],
	created: {
		type: Date,
		default: Date.now
	}
});

schema.set('toJSON', {
	transform: function (doc, ret, options) {
		delete ret.__v;

		delete ret.blocked;

		if (ret.comments === null) {
			delete ret.comments;
		}

		if (ret.attending === null) {
			delete ret.attending;
		}

		if (ret.requests === null) {
			delete ret.requests;
		}

		if (ret.comments) {
			ret.comments = ret.comments.reduce(function (comments, comment) {
				comments.push(comment._id);

				return comments;
			}, []);
		}

		if (ret.attending) {
			ret.attending = ret.attending.reduce(function (attending, user) {
				attending.push(user);

				return attending;
			}, []);
		}
	}
});

module.exports = mongoose.model('Event', schema);
