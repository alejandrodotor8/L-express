//% ===== PRODUCTS =====
const express = require('express');
const ProductService = require('../services/productService');

const productsRouter = express.Router();
const service = new ProductService();

//% GET
productsRouter.get('/', async (req, res) => {
	//Query parameter
	const { size = service.size } = req.query;
	const products = await service.find(size);

	res.json({ size: parseInt(size), products });
});
//% GET :id -> params
productsRouter.get('/:id', async (req, res) => {
	const { id } = req.params;
	const product = await service.findOne(id);
	if (product) {
		res.status(200).json(product);
	} else {
		res.status(404).json({
			message: 'Not found',
		});
	}
});

//% POST
productsRouter.post('/', async (req, res) => {
	const body = req.body;
	const newProduct = await service.create(body);
	res.status(201).json({
		message: 'Created',
		data: newProduct,
	});
});

//% PATCH
productsRouter.patch('/:id', async (req, res) => {
	const { id } = req.params;
	const body = req.body;
	const product = await service.update(id, body);
	res.json({
		message: 'Updated',
		data: product,
	});
});

//% DELETE
productsRouter.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const productId = await service.delete(id);
	res.json({
		message: 'Deleted',
		data: productId,
	});
});

module.exports = productsRouter;
