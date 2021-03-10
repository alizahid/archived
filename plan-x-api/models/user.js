var mongoose = require('mongoose');

var push = require('../plan-x/push');

var schema = new mongoose.Schema({
	name: String,
	about: String,
	gender: String,
	birthday: Date,
	email: {
		type: String,
		index: true,
		unique: true,
		select: false
	},
	password: {
		type: String,
		select: false
	},
	phone: {
		type: String,
		unique: true,
		select: false,
		sparse: true
	},
	photo: String,
	verification: mongoose.Schema.Types.Mixed,
	token: {
		type: String,
		unique: true,
		select: false
	},
	device: mongoose.Schema.Types.Mixed,
	notifications: [{
		body: String,
		data: mongoose.Schema.Types.Mixed,
		read: {
			type: Boolean,
			default: false
		},
		created: {
			type: Date,
			default: Date.now
		}
	}],
	joined: {
		type: Date,
		default: Date.now
	}
});

schema.methods.logout = function () {
	this.device = null;

	this.save();
}

schema.statics.register = function (id, device) {
	this.findByIdAndUpdate(id, {
		$set: {
			device: {
				type: device.type,
				token: device.token
			}
		}
	}, function (err) {
		if (err) {
			console.error('register', id, err);
		}
	});
};

schema.statics.notify = function (ids, body, data) {
	if (!ids.forEach) {
		ids = [ids];
	}

	this.find({
		_id: {
			$in: ids
		}
	}, function (err, users) {
		if (err || !users) {
			return;
		}

		var total = users.length,
			done = 0;

		var devices = [];

		var callback = function (notification) {
			if (total === done) {
				push.push(devices, notification);
			}
		};

		users.forEach(function (user) {
			var notification;

			user.notifications.some(function (item) {
				if (item.data.action === data.action && item.data.target.id.equals(data.target.id)) {
					notification = item;

					return true;
				}
			});

			if (notification) {
				user.notifications.pull(notification._id);
			}

			notification = user.notifications.create({
				body: body,
				data: data
			});

			user.notifications.unshift(notification);

			user.save(function () {
				devices.push(user.device);

				done++;

				callback(notification);
			});
		});
	});
};

schema.set('toJSON', {
	transform: function (doc, ret, options) {
		delete ret.__v;

		if (ret.verification) {
			var verified = [];

			if (ret.verification.phone.verified) {
				verified.push('phone');
			}

			if (ret.verification.email.verified) {
				verified.push('email');
			}

			ret.verification = verified.join(' ');
		}

		if (options.isLoggedInUser) {
			ret.notifications = ret.notifications.reduce(function (count, notification) {
				if (!notification.read) {
					count++;
				}

				return count;
			}, 0);
		} else {
			delete ret.notifications;
			delete ret.birthday;
		}

		if (ret.birthday) {
			var difference = Date.now() - ret.birthday.getTime(),
				date = new Date(difference);

			ret.age = Math.abs(date.getUTCFullYear() - 1970);
		}

		delete ret.device;
	}
});

module.exports = mongoose.model('User', schema);
