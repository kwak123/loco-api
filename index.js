const express = require('express');
const db = require('./db');
const instance = require('./instance');
const router = require('./router').router;

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

// Initialize routes
app.use('/', router);

let port = process.env.port || 3001;
app.listen(port, () => console.log(`now listening on ${port}`));