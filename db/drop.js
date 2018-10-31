const connection = require('./config');
const utils = require('./utils');

const { knex } = connection;

// const formatDropTablesQuery = sub => `
//   DROP TABLE IF EXISTS
//     ${sub}_stops,
//     ${sub}_stop_times,
//     ${sub}_routes,
//     ${sub}_stop_routes
// `;

const dropTables = (sub) => {
  const stopsTable = utils.formatTableName({ sub, tableType: 'stops' });
  const stopTimesTable = utils.formatTableName({ sub, tableType: 'stop_times' });
  const routesTable = utils.formatTableName({ sub, tableType: 'routes' });
  const stopRoutesTable = utils.formatTableName({ sub, tableType: 'stop_routes' });
  // return connection.query(dropTablesQuery);
  return knex.schema
    .dropTableIfExists(stopsTable)
    .dropTableIfExists(stopTimesTable)
    .dropTableIfExists(routesTable)
    .dropTableIfExists(stopRoutesTable);
};

module.exports = {
  dropTables,
};
