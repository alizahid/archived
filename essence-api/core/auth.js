var User = require('../models/user');

module.exports = (req, res, next) => {
	if (req.headers.token) {
		User.findOne({
			token: req.headers.token
		}, 'email token payment location reset', (err, user) => {
			if (err || !user) {
				return res.status(403).send({});
			}

			req.user = user;

			next();
		});
	} else {
		res.status(401).send({});
	}
};
