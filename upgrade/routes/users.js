const express = require('express'),
	router = express.Router();

router.get('/', (req, res, next) => {
	res.send([]);
});

module.exports = router;
