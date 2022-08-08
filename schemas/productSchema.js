const Joi = require('joi');

const id = Joi.number().min(0).max(2000).strict();
const name = Joi.string().min(3).max(20).strict();
const price = Joi.number().integer().min(10).max(20000).strict();
const image = Joi.string().uri().strict();
const isBlock = Joi.boolean().strict();

const createProductSchema = Joi.object({
	name: name.required(),
	price: price.required(),
	isBlock: isBlock.required(),
	image: image.required(),
});

const updateProductSchema = Joi.object({
	name: name,
	price: price,
	image: image,
	isBlock: isBlock,
});

const getProductSchema = Joi.object({
	id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
