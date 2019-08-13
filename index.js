const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config/config.js');
const logger = require('./config/winston');
const routes = require('./app/routes');

const db = config.mongoDb.uri;
console.log(config, db);
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

mongoose.connect(db, { useNewUrlParser: true })
  .then(() => logger.info('database connected'))
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });

routes(app);

app.on('uncaughtException', (req, res, route, err) => {
  console.log('uncaughtException', err);
  logger.warn('Uncaught process exception: ', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.log('unhandledRejection', reason);
  logger.error('Unhandled promise rejection:', reason);
  process.exit(1);
});

const port = process.env.PORT || 3001;

app.listen(port, () => logger.info(`server running on port ${port}`));

module.exports = app;
