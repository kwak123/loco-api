const connection = require('./config');
const util = require('../lib/util');

const { knex } = connection;

// Probably need some form of enums for these
const formatTableName = (sub, tableType) => `${sub}_${tableType}`;

const getTimesByStop = (sub, stopId) => {
  const stopTimesTable = formatTableName(sub, 'stop_times');
  return knex(stopTimesTable)
    .where({ stop_id: stopId })
    .then((result) => {
      util.sortByTime(result);
      return result;
    });
};

const getTimesByRoute = (sub, routeId) => {
  const stopRoutesTable = formatTableName(sub, 'stop_routes');
  return knex(stopRoutesTable)
    .where({ route_id: routeId })
    .then((result) => {
      util.sortByTime(result);
      return result;
    });
};

const getTimesByStopAndRoute = (sub, stopId, routeId) => {
  const stopTimesTable = formatTableName(sub, 'stop_times');
  return knex(stopTimesTable)
    .where({ stop_id: stopId, route_id: routeId })
    .then((result) => {
      util.sortByTime(result);
      return result;
    });
};

const getStops = (sub) => {
  const stopsTable = formatTableName(sub, 'stops');
  return knex(stopsTable);
};

const getStop = (sub, stopId) => {
  const stopsTable = formatTableName(sub, 'stops');
  return knex(stopsTable)
    .where({ stop_id: stopId });
};

const getRoutes = (sub) => {
  const routesTable = formatTableName(sub, 'routes');
  return knex(routesTable);
};

const getRoute = (sub, routeId) => {
  const routesTable = formatTableName(sub, 'routes');
  return knex(routesTable)
    .where({ route_id: routeId });
};

const getStopsByRoute = (sub, routeId) => {
  const stopRoutesTable = formatTableName(sub, 'stop_routes');
  const stopsTable = formatTableName(sub, 'stops');
  return knex(stopRoutesTable)
    .innerJoin(stopsTable, `${stopRoutesTable}.stop_id`, `${stopsTable}.stop_id`)
    .where({ route_id: routeId });
};

const getStopsByCoords = (sub) => {
  const stopRoutesTable = formatTableName(sub, 'stop_routes');
  const stopsTable = formatTableName(sub, 'stops');
  return knex(stopsTable)
    .rightJoin(stopRoutesTable, `${stopsTable}.stop_id`, `${stopRoutesTable}.stop_id`);
};

// Query formatting tools
const formatters = {
  formatTableName,
};

const getters = {
  getTimesByStop,
  getTimesByRoute,
  getTimesByStopAndRoute,
  getStop,
  getStops,
  getRoute,
  getRoutes,
  getStopsByRoute,
  getStopsByCoords,
};

module.exports = {
  formatters,
  getters,
};
