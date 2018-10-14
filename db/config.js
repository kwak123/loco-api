const mysql = require('mysql');
const keys = require('../env/keys');

const connection = mysql.createConnection({
  host: keys.DB_HOST,
  port: keys.DB_PORT,
  database: keys.DB_NAME, // Change this
  user: keys.DB_USER,
  password: keys.DB_PASSWORD,
});

connection.connect((error) => {
  if (error) {
    /* eslint-disable-next-line no-console */
    return console.log(error);
  }
  /* eslint-disable-next-line no-console */
  return console.log(`connected with id ${connection.threadId}`);
});

module.exports = {
  query: (...args) => new Promise((resolve, reject) => {
    connection.query(...args, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  }),
};
