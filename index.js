// Disable this lint because we need this to start up the app
/* eslint-disable no-unused-vars */
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const instance = require('./instance');
const { router } = require('./router');
const { PORT } = require('./env/keys');
/* eslint-enable no-unused-vars */

const app = express();

// All currently supported trainlines go in here
const ALLOWED = ['mta'];

// Lightweight logger
const logger = (req, res, next) => {
  /* eslint-disable-next-line no-console */
  console.log(`received ${req.method} at ${req.url}`);
  next();
};

// Every request needs a sub specified
// This is used in dynamic table fetching, thankfully hard matching to an expected string should protect against injection
const checkSub = (req, res, next) => {
  if (ALLOWED.includes(req.query.sub)) {
    return next();
  }
  return res.sendStatus(404);
};

app.use(logger);
app.use(checkSub);
app.use(bodyParser.json());

// Initialize routes
app.use('/', router);

/* eslint-disable-next-line no-console */
app.listen(PORT, () => console.log(`now listening on ${PORT}`));
