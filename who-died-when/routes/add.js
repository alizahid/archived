var router = require('express').Router(),
	request = require('request');

router.get('/death', function (req, res, next) {
	res.render('add/death', {
		title: 'Who Died When / Add death'
	});
});

router.get('/show', function (req, res, next) {
	if (req.query.query) {
		request(process.env.TMDB_API_URI + '/search/tv?api_key=' + process.env.TMDB_API_KEY + '&query=' + encodeURIComponent(req.query.query), function (err, response, body) {
			if (err) {
				return next(err);
			}

			var results = JSON.parse(body).results.reduce(function (results, show) {
				if (show.poster_path) {
					results.push({
						id: show.id,
						name: show.name,
						poster: show.poster_path
					});
				}

				return results;
			}, []);

			res.render('add/show', {
				title: 'Who Died When / Add show',
				searchQuery: req.query.query,
				results: results,
				baseUrl: process.env.TMDB_IMAGE_URI
			});
		});
	} else {
		res.render('add/show', {
			title: 'Who Died When / Add show'
		});
	}
});

router.get('/show/:id', function (req, res, next) {
	if (req.query.confirm !== 'yes') {
		return next();
	}

	var id = parseInt(req.params.id);

	if (id) {
		db.query('SELECT id FROM shows WHERE id = $1 LIMIT 1', [id], function (err, data) {
			if (err) {
				return next(err);
			}

			if (data.rows.length > 0) {
				res.redirect('/shows/' + id);
			} else {
				request(process.env.TMDB_API_URI + '/tv/' + id + '?api_key=' + process.env.TMDB_API_KEY, function (err, response, body) {
					if (err) {
						return next(err);
					}

					var json = JSON.parse(body);

					var show = {
						id: json.id,
						name: json.name,
						poster: json.poster_path,
						characters: []
					};

					var added = [];

					(function (data, callback) {
						var total = data.seasons.length;

						if (total == 0) {
							return callback();
						}

						data.seasons.forEach(function (season) {
							request(process.env.TMDB_API_URI + '/tv/' + id + '/season/' + season.season_number + '/credits?api_key=' + process.env.TMDB_API_KEY, function (err, response, body) {
								if (err) {
									return next(err);
								}

								var json = JSON.parse(body);

								json.cast.forEach(function (member) {
									if (member.character && added.indexOf(member.id) < 0) {
										show.characters.push(member.character);

										added.push(member.id);
									}
								});

								total--;

								if (total == 0) {
									callback();
								}
							});
						});
					})(json, function () {
						db.query('INSERT INTO shows (id, name, poster) VALUES ($1, $2, $3)', [show.id, show.name, show.poster], function (err, data) {
							if (err) {
								return next(err);
							}

							if (show.characters.length == 0) {
								return res.redirect('/shows/' + id);
							}

							var query = 'INSERT INTO characters (name, show) VALUES ',
								params = [],
								chunks = [];

							show.characters.forEach(function (name) {
								var value = [];

								params.push(name);
								value.push('$' + params.length);

								params.push(id);
								value.push('$' + params.length);

								chunks.push('(' + value.join(', ') + ')')
							});

							db.query(query + chunks.join(', '), params, function (err, data) {
								if (err) {
									return next(err);
								}

								res.redirect('/shows/' + id);
							});
						});
					});
				});
			}
		});
	} else {
		res.send(400, {});
	}
});

router.get('/character', function (req, res, next) {
	res.render('add/character', {
		title: 'Who Died When / Add character'
	});
});

module.exports = router;