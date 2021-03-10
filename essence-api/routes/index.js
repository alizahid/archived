const express = require('express'),
	router = express.Router();

router.get('/', (req, res) => {
	res.redirect('https://sosessence.fr/');
});

module.exports = router;
