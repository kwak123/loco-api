const knex = require('./knex');

/* eslint-disable no-console */
knex.raw('SHOW TABLES')
  // Last element is field packet
  .then(result => console.log('Connected, current tables: \n', result.slice(0, result.length - 1)))
  .catch(err => console.error('Failed', err));
/* eslint-enable no-console */

module.exports = {
  query: (...args) => knex.raw(...args),
};
