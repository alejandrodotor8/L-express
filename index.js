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

const corsWhiteList = ['https://alejandrodotor.com'];

const corsOptions = {
	origin: (origin, callBack) => {
		console.log(origin);
		if (corsWhiteList.includes(origin)) {
			callBack(null, true);
		} else {
			callBack(new Error('Dominio no permitido'));
		}
	},
};
app.use(cors(corsOptions));

routerApi(app);

app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);

app.listen(port, () => {
	console.log('Listening at: http://localhost:' + port);
});
