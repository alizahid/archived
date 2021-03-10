var router = require('express').Router();

router.get('/', function (req, res, next) {
	var query = db.query('SELECT id, name, poster FROM shows WHERE updated IS NOT NULL ORDER BY updated DESC LIMIT 9');

	var data = [];

	query.on('row', function (row) {
		data.push(row);
	});

	query.on('error', function (error) {
		res.render('error', {
			message: error.message,
			error: error
		});
	});

	query.on('end', function () {
		res.render('index', {
			title: 'Who Died When',
			shows: data,
			baseUrl: process.env.TMDB_IMAGE_URI
		});
	});
});

module.exports = router;