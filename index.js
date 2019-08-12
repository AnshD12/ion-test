const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config/config.js');
const logger = require('./config/winston');
const routes = require('./app/routes');

const db = config.mongoDb.uri;
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

mongoose.connect(db, { useNewUrlParser: true })
  .then(() => logger.info('database connected'))
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });

routes(app);

const port = process.env.PORT || 3001;

app.listen(port, () => logger.info(`server running on port ${port}`));

module.exports = app;
