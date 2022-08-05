//% ===== HOME =====
const express = require('express');

const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
	res.send('Hola mi server en Express');
});

module.exports = homeRouter;
