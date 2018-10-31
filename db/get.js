const connection = require('./config');
const util = require('../lib/util');
const utils = require('./utils');

const { knex } = connection;

const getTimesByStop = (sub, stopId) => {
  const stopTimesTable = utils.formatTableName({ sub, tableType: 'stop_times' });
  return knex(stopTimesTable)
    .where({ stop_id: stopId })
    .then((result) => {
      util.sortByTime(result);
      return result;
    });
};

const getTimesByRoute = (sub, routeId) => {
  const stopRoutesTable = utils.formatTableName({ sub, tableType: 'stop_routes' });
  return knex(stopRoutesTable)
    .where({ route_id: routeId })
    .then((result) => {
      util.sortByTime(result);
      return result;
    });
};

const getTimesByStopAndRoute = (sub, stopId, routeId) => {
  const stopTimesTable = utils.formatTableName({ sub, tableType: 'stop_times' });
  return knex(stopTimesTable)
    .where({ stop_id: stopId, route_id: routeId })
    .then((result) => {
      util.sortByTime(result);
      return result;
    });
};

const getStops = (sub) => {
  const stopsTable = utils.formatTableName({ sub, tableType: 'stops' });
  return knex(stopsTable);
};

const getStop = (sub, stopId) => {
  const stopsTable = utils.formatTableName({ sub, tableType: 'stops' });
  return knex(stopsTable)
    .where({ stop_id: stopId });
};

const getRoutes = (sub) => {
  const routesTable = utils.formatTableName({ sub, tableType: 'routes' });
  return knex(routesTable);
};

const getRoute = (sub, routeId) => {
  const routesTable = utils.formatTableName({ sub, tableType: 'routes' });
  return knex(routesTable)
    .where({ route_id: routeId });
};

const getStopsByRoute = (sub, routeId) => {
  const stopRoutesTable = utils.formatTableName({ sub, tableType: 'stop_routes' });
  const stopsTable = utils.formatTableName({ sub, tableType: 'stops' });
  return knex(stopRoutesTable)
    .innerJoin(stopsTable, `${stopRoutesTable}.stop_id`, `${stopsTable}.stop_id`)
    .where({ route_id: routeId });
};

const getStopsByCoords = (sub) => {
  const stopRoutesTable = utils.formatTableName({ sub, tableType: 'stop_routes' });
  const stopsTable = utils.formatTableName({ sub, tableType: 'stops' });
  return knex(stopsTable)
    .rightJoin(stopRoutesTable, `${stopsTable}.stop_id`, `${stopRoutesTable}.stop_id`);
};

module.exports = {
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
