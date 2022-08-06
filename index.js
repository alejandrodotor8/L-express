const express = require('express');
const routerApi = require('./routes');

//Init Express
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log('Listening at: http://localhost:' + port);
});

app.use(express.json());

routerApi(app);
