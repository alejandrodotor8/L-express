const express = require('express');
const homeRouter = require('./homeRouter');
const productsRouter = require('./productsRouter');
const categoriesRouter = require('./categoriesRouter');
const usersRouter = require('./usersRouter');

function routerApi(app) {
	const router = express.Router();
	app.use('/api/v1', router);
	app.use('/', homeRouter);
	router.use('/products', productsRouter);
	router.use('/categories', categoriesRouter);
	router.use('/users', usersRouter);
}

module.exports = routerApi;
