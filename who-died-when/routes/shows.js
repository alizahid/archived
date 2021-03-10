var router = require('express').Router();

var getToday = function () {
	var date = new Date();

	var year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate();

	var pad = function (string, length, padding) {
		string = string.toString();
		padding = padding.toString();

		while (string.length < length) {
			string = padding + string;
		}

		return string;
	};

	return year + '-' + pad(month, 2, 0) + '-' + pad(day, 2, 0);
}

router.get('/', function (req, res, next) {
	var start = req.query.start || 'a';

	db.query('SELECT id, name, poster, deaths FROM shows WHERE LOWER(name) LIKE $1 ORDER BY name ASC', [start.toLowerCase() + '%'], function (err, data) {
		if (err) {
			return next(err);
		}

		if (!data || !data.rows.length) {
			return next();
		}

		res.render('shows/index', {
			title: 'Who Died When / Shows / ' + start.toUpperCase(),
			shows: data.rows,
			index: 'abcdefghijklmnopqrstuvwxyz'.split(''),
			start: start
		});
	});
});

router.get('/:id', function (req, res, next) {
	db.query('SELECT id, name, poster, deaths FROM shows WHERE id = $1 LIMIT 1', [req.params.id], function (err, data) {
		if (err) {
			return next(err);
		}

		if (!data || !data.rows.length) {
			return next();
		}

		var show = {
			id: data.rows[0].id,
			name: data.rows[0].name,
			poster: data.rows[0].poster,
			deaths: data.rows[0].deaths,
			characters: []
		};

		db.query('SELECT id, name, death_season, death_episode, death_killer, death_description FROM characters WHERE show = $1 ORDER BY updated DESC, name ASC', [show.id], function (err, data) {
			if (err) {
				return next(err);
			}

			if (!data) {
				return next();
			}

			data.rows.forEach(function (row) {
				var death = null;

				if (row.death_season) {
					death = {
						season: row.death_season,
						episode: row.death_episode,
						killer: row.death_killer,
						description: row.death_description
					};
				}

				show.characters.push({
					id: row.id,
					name: row.name,
					death: death
				});
			});

			res.render('shows/show', {
				title: 'Who Died When / Shows / ' + show.name,
				show: show,
				baseUrl: process.env.TMDB_IMAGE_URI
			});
		});

	});
});

router.get('/:id/characters', function (req, res, next) {
	var id = parseInt(req.params.id);

	if (!id) {
		return next();
	}

	db.query('SELECT id, name FROM characters WHERE show = $1 ORDER BY name ASC', [id], function (err, data) {
		if (err) {
			return next(err);
		}

		if (!data || !data.rows.length) {
			return next();
		}

		res.send(data.rows);
	});
});

router.get('/death/:id', function (req, res, next) {
	var id = parseInt(req.params.id);

	if (!id) {
		return next();
	}

	db.query('SELECT shows.id AS show_id, shows.name AS show_name, characters.id AS character_id, characters.name AS character_name FROM characters INNER JOIN shows ON characters.show = shows.id WHERE characters.id = $1 LIMIT 1', [id], function (err, data) {
		if (err) {
			return next(err);
		}

		if (!data || !data.rows.length) {
			return next();
		}

		res.render('dialogs/death', {
			show: {
				id: data.rows[0].show_id,
				name: data.rows[0].show_name
			},
			character: {
				id: data.rows[0].character_id,
				name: data.rows[0].character_name
			},
			now: getToday()
		});
	});
});

router.delete('/death/:id', function (req, res, next) {
	var id = parseInt(req.params.id);

	if (!id) {
		return next();
	}

	db.query('UPDATE characters SET death_season = $2, death_episode = $3, death_killer = $4, death_description = $5, updated = $6 WHERE id = $1', [id, req.body.season, req.body.episode, req.body.killer, req.body.description, req.body.updated], function (err, data) {
		if (err) {
			return next(err);
		}

		if (!data || !data.rowCount) {
			return next();
		}

		db.query('UPDATE shows SET updated = $2 WHERE id = (SELECT show FROM characters WHERE id = $1)', [id, req.body.updated], function (err, data) {
			if (err) {
				return next(err);
			}

			if (!data || !data.rowCount) {
				return next();
			}

			res.send({});
		});
	});
});

router.get('/:id/add', function (req, res, next) {
	var id = parseInt(req.params.id);

	if (!id) {
		return next();
	}

	db.query('SELECT id, name FROM shows WHERE id = $1 LIMIT 1', [id], function (err, data) {
		if (err) {
			return next(err);
		}

		if (!data || !data.rows.length) {
			return next();
		}

		res.render('dialogs/add', {
			show: {
				id: data.rows[0].id,
				name: data.rows[0].name
			},
			now: getToday()
		});
	});
});

router.post('/:id/add', function (req, res, next) {
	var id = parseInt(req.params.id);

	if (!id) {
		return next();
	}

	db.query('INSERT INTO characters (show, name, death_season, death_episode, death_killer, death_description, updated) VALUES ($1, $2, $3, $4, $5, $6, $7)', [id, req.body.name, req.body.season || null, req.body.episode || null, req.body.killer || null, req.body.description || null, req.body.updated || null], function (err, data) {
		if (err) {
			return next(err);
		}

		if (!data || !data.rowCount) {
			return next();
		}

		res.send({});
	});
});

module.exports = router;