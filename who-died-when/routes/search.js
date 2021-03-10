var router = require('express').Router();

router.get('/', function (req, res, next) {
	var query = db.query('SELECT id, name, poster FROM shows WHERE LOWER(name) LIKE $1 ORDER BY name ASC LIMIT $2', ['%' + req.query.query.toLowerCase() + '%', req.xhr ? 5 : 20], function (err, data) {
		if (err) {
			return next(err);
		}

		if (!data || !data.rows.length) {
			return next();
		}

		query.on('end', function () {
			res.render(req.xhr ? 'search/results' : 'search/index', {
				title: 'Who Died When / Search / "' + req.query.query + '"',
				query: req.query.query,
				results: data.rows,
				baseUrl: process.env.TMDB_IMAGE_URI
			});
		});
	});
});

module.exports = router;