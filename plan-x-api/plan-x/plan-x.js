var User = require('../models/user');

exports.auth = function (req, res, next) {
	if (req.headers.token) {
		User.findOne({
			token: req.headers.token
		}, function (err, user) {
			if (err || !user) {
				return res.status(403).send({
					error: 'Invalid authentication token'
				});
			}

			req.user = user;

			next();
		});
	} else {
		res.status(401).send({
			error: 'Missing authentication token'
		});
	}
};

exports.uploadPhoto = function (id, photo, version, callback) {
	var aws = require('aws-sdk');

	aws.config.update({
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
	});

	var s3 = new aws.S3();

	s3.upload({
		ACL: 'public-read',
		Body: new Buffer(photo, 'base64'),
		Bucket: process.env.AWS_S3_BUCKET,
		ContentType: 'image/jpeg',
		Key: 'photos/' + id,
	}, function (err, data) {
		if (err) {
			console.error(err);

			if (typeof callback === 'function') {
				callback(null, err);
			}
		} else {
			if (typeof callback === 'function') {
				var url = 'https://' + process.env.AWS_S3_BUCKET + '.s3.amazonaws.com/photos/' + id + '?v=' + (version + 1);

				callback(url);
			}
		}
	});
};

exports.renderTemplate = function (template, data, callback) {
	var fs = require('fs'),
		path = require('path');

	template = path.join(__dirname, '..', 'assets', template + '.html');

	fs.readFile(template, function (err, template) {
		if (err) {
			return;
		}

		html = template.toString();

		if (data) {
			Object.keys(data).forEach(function (key) {
				if (html.indexOf(key) >= 0) {
					html = html.replace(new RegExp('{{' + key + '}}', 'g'), data[key]);
				}

			});
		}

		if (typeof callback === 'function') {
			callback(html);
		}
	});
};
