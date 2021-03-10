var router = require('express').Router();

router.get('/', function (req, res, next) {
	const LIMIT = 100;

	db.query('SELECT COUNT(CASE WHEN death_episode IS NOT NULL THEN 1 END) FROM characters', function (err, data) {
		if (err) {
			return next(err);
		}

		if (!data || !data.rows.length) {
			return next();
		}

		var deaths = {
			count: data.rows[0].count,
			characters: []
		};

		var page = parseInt(req.query.page) || 1;

		db.query('SELECT characters.name, public.shows.name AS show_name, public.shows.id AS show_id, characters.death_season, characters.death_episode, characters.death_killer, characters.death_description FROM characters INNER JOIN public.shows ON characters.show = public.shows.id WHERE death_episode IS NOT NULL ORDER BY characters.updated DESC, characters.name ASC LIMIT $1 OFFSET $2', [LIMIT, (page - 1) * LIMIT], function (err, data) {
			if (err) {
				return next(err);
			}

			if (!data || !data.rows.length) {
				return next();
			}

			data.rows.forEach(function (row) {
				deaths.characters.push({
					name: row.name,
					show: {
						id: row.show_id,
						name: row.show_name
					},
					death: {
						season: row.death_season,
						episode: row.death_episode,
						killer: row.death_killer,
						description: row.death_description
					}
				});
			});

			var pages = [];

			for (var i = 1; i <= Math.ceil(deaths.count / LIMIT); i++) {
				pages.push(i);
			}

			if (pages.length > 10) {
				var index = pages.indexOf(page);

				var start = index - 2,
					end = index + 3;

				pages = pages.slice(start >= 0 ? start : 0, end <= pages.length ? end : pages.length);
			}

			res.render('deaths', {
				title: 'Who Died When / Deaths',
				count: deaths.count,
				pages: pages,
				page: page,
				characters: deaths.characters,
				baseUrl: process.env.TMDB_IMAGE_URI
			});
		});
	});
});

module.exports = router;