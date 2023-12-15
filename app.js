const cors = require('cors');
const express = require('express');

const errorMiddleware = require('./src/middlewares/error-handler.middleware');
const router = require('./src/routes/index');

const app = express();

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use(errorMiddleware);
module.exports = app;
