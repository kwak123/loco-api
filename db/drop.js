const connection = require('./config');

const formatDropTablesQuery = sub => `
  DROP TABLE IF EXISTS 
    ${sub}_stops, 
    ${sub}_stop_times, 
    ${sub}_routes, 
    ${sub}_stop_routes
`;

const dropTables = (sub) => {
  const dropTablesQuery = formatDropTablesQuery(sub);
  return connection.query(dropTablesQuery);
};

module.exports = {
  dropTables,
};
