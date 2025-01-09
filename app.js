const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
require('dotenv').config();

const routes = require('./routes/index');
const { handleError } = require('./utils/errors/handleError');
const { limiter } = require('./utils/errors/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_DEV_ADDRESS } = require('./utils/errors/config');

const { PORT = 3001, MONGO_ADDRESS, NODE_ENV } = process.env;
const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGO_ADDRESS : MONGO_DEV_ADDRESS);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(requestLogger);
app.use(limiter);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
