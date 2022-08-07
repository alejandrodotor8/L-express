const express = require('express');
const routerApi = require('./routes');

//Middleware
const {
	logErrors,
	errorHandler,
	boomErrorHandler,
} = require('./middleware/errorHandler');

//Init Express
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

routerApi(app);

app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);

app.listen(port, () => {
	console.log('Listening at: http://localhost:' + port);
});
