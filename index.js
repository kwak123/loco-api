const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const instance = require('./instance');
const router = require('./router').router;
const { PORT } = require('./env/key');

const app = express();

// All currently supported trainlines would go in here
const ALLOWED = ['mta']; 

// Lightweight logger
const logger = (req, res, next) => {
  console.log(`received ${req.method} at ${req.url}`);
  next();
};

// Every request needs a sub specified
const checkSub = (req, res, next) => {
  if (!ALLOWED.includes(req.query.sub)) {
    return res.sendStatus(404);
  }
  next();
};

app.use(logger);
app.use(checkSub);
app.use(bodyParser.json());

// Initialize routes
app.use('/', router);

app.listen(PORT, () => console.log(`now listening on ${PORT}`));