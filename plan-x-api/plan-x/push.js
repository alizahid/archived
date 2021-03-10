var https = require('https');

exports.push = function (devices, notification) {
	var title;

	switch (notification.data.action) {
		case 'comment':
			title = 'New comment';
			break;

		case 'request':
			title = 'New request';
			break;

		case 'accepted':
			title = 'Request accepted';
			break;

		default:
			title = 'New notification';
			break;
	}

	var req = https.request({
		host: 'gcm-http.googleapis.com',
		path: '/gcm/send',
		port: 443,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'key=' + process.env.GCM_API_KEY
		}
	}, function (res) {
		res.setEncoding('utf8');

		var data = '';

		res.on('data', function (chunk) {
			data += chunk;
		});

		res.on('end', function () {
			console.log('push', data);
		});

		res.on('error', function (err) {
			console.error('push', err);
		});
	});

	var tokens = devices.reduce(function (tokens, device) {
		if (device) {
			tokens.push(device.token);
		}

		return tokens;
	}, []);

	var data = JSON.stringify({
		registration_ids: tokens,
		data: notification.data,
		notification: {
			title: title,
			body: notification.body,
			image: notification.data.user.photo
		}
	});

	req.write(data);

	req.end();
};

exports.setBadge = function (device, count) {
	if (device.type !== 'ios') {
		return;
	}

	var req = https.request({
		host: 'gcm-http.googleapis.com',
		path: '/gcm/send',
		port: 443,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'key=' + process.env.GCM_API_KEY
		}
	}, function (res) {
		res.setEncoding('utf8');

		var data = '';

		res.on('data', function (chunk) {
			data += chunk;
		});

		res.on('end', function () {
			console.log('setBadge', data);
		});

		res.on('error', function (err) {
			console.error('setBadge', err);
		});
	});

	var data = JSON.stringify({
		registration_ids: [device.token],
		notification: {
			badge: count
		}
	});

	req.write(data);

	req.end();
};
