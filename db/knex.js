const knexFactory = require('knex');
const keys = require('../env/keys');

const knex = knexFactory({
  client: 'mysql',
  // version: '8.0.12',
  connection: {
    host: keys.DB_HOST,
    port: keys.DB_PORT,
    user: keys.DB_USER,
    password: keys.DB_PASSWORD,
    database: keys.DB_NAME,
  },
  acquireConnectionTimeout: 1000,
});

module.exports = knex;
