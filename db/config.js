const mysql = require('mysql');
const keys = require('../env/key');

const connection = mysql.createConnection({
  database: keys.DB_NAME, // Change this
  user: keys.DB_USER,
  password: keys.DB_PASSWORD
});

connection.connect((error) => {
  if (error) { return console.log(error); }
  console.log(`connected with id ${connection.threadId}`);
});

module.exports = connection;