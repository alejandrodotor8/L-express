const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.send('Hola mi server en Express');
});
app.get('/hola', (req, res) => {
	res.send('<h1>HOLA!</h1>');
});
app.get('/api', (req, res) => {
	console.log('req to API');
	res.json({
		name: 'Alejandro',
		year: 1998,
	});
});

app.listen(port, () => {
	console.log('Listening at: http://localhost:' + port);
});
