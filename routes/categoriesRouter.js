//% ===== CATEGORIES =====
const express = require('express');

const categoriesRouter = express.Router();

categoriesRouter.get('/:catId/products/:productID', (req, res) => {
	const { catId, productID } = req.params;
	res.json({
		cat_id: catId,
		product_id: productID,
		name: 'product 1',
		price: 1000,
	});
});

module.exports = categoriesRouter;
