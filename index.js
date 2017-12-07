const express = require('express');
const db = require('./db');
const instance = require('./instance');


const app = express();

const logger = (req, res, next) => {
  console.log(`received ${req.method} at ${req.url}`);
  next();
};

app.use(logger);

app.use('/', router);