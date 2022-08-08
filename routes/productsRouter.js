//% ===== PRODUCTS =====
const express = require('express');
const ProductService = require('../services/productService');
const validatorHandler = require('../middleware/validatorHandler');
const {
	createProductSchema,
	updateProductSchema,
	getProductSchema,
} = require('../schemas/productSchema');

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
productsRouter.get(
	'/:id',
	validatorHandler(getProductSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const product = await service.findOne(id);
			res.status(200).json(product);
		} catch (error) {
			next(error);
		}
	}
);

//% POST
productsRouter.post(
	'/',
	validatorHandler(createProductSchema, 'body'),
	async (req, res) => {
		const body = req.body;
		const newProduct = await service.create(body);
		res.status(201).json({
			message: 'Created',
			data: newProduct,
		});
	}
);

//% PATCH
productsRouter.patch(
	'/:id',
	validatorHandler(getProductSchema, 'params'),
	validatorHandler(updateProductSchema, 'body'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const product = await service.update(id, body);
			res.json({
				message: 'Updated',
				data: product,
			});
		} catch (error) {
			next(error);
		}
	}
);

//% DELETE
productsRouter.delete('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const productId = await service.delete(id);
		res.json({
			message: 'Deleted',
			data: productId,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = productsRouter;
