const express = require('express'),
	router = express.Router();

router.get('/', (req, res, next) => {
	res.render('index', {
		title: 'Upgrade'
	});
});

module.exports = router;
