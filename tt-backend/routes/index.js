const express = require('express'),
	router = express.Router();

const request = require('request'),
	xml = require('xml2js').parseString;

router.get('/', (req, res) => {
	res.redirect('https://hostd.in/tt');
});

router.get('/products', (req, res, next) => {
	if (req.query.url) {
		request(req.query.url, (err, response, body) => {
			if (err) {
				return next(err);
			}

			xml(body, (err, result) => {
				if (err) {
					return next(err);
				}

				let products = result.products.product.map((product) => {
					let price = product.price && product.price.pop(),
						categories = product.categories && product.categories.pop().category;

					return {
						id: product.productID.pop(),
						name: product.name.pop(),
						description: product.description.pop(),
						price: price && price._,
						currency: price && price.$.currency,
						categories: categories && categories.map((category) => {
							return category.$.path;
						}),
						link: product.productURL.pop(),
						image: product.imageURL.pop(),
					};
				});

				res.send({
					products: products
				});
			});
		});
	}
});

module.exports = router;
