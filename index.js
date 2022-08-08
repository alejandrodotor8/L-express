const express = require('express');
const cors = require('cors');
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

const corsWhiteList = ['http://127.0.0.1:8080', 'https://alejandrodotor.com'];
const corsOptions = {
	origin: (origin, callBack) => {
		if (corsWhiteList.includes(origin)) {
			callBack(null, true);
		} else {
			callBack(new Error('Dominio no permitido'));
		}
	},
};
app.use(cors(corsOptions));

app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);

app.listen(port, () => {
	console.log('Listening at: http://localhost:' + port);
});
