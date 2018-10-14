const connection = require('./config');
const util = require('../lib/util');

// Query formatters
const formatKeyList = (keyList) => {
  if (!keyList.length) {
    return '';
  }
  const keyString = keyList
    .map(key => `\`${key}\` = ?`)
    .join(' AND ');
  return `WHERE ${keyString}`;
};

const formatGetQuery = (sub, tableType, keyList = []) => {
  const subType = `${sub}_${tableType}`;
  const formattedKeyString = formatKeyList(keyList);

  const queryString = `SELECT * FROM \`${subType}\` ${formattedKeyString}`;
  return queryString.trim();
};

const formatGetTimesByStopQuery = sub => formatGetQuery(sub, 'stop_times', ['stop_id']);

const formatGetTimesByRouteQuery = sub => formatGetQuery(sub, 'stop_times', ['route_id']);

const formatGetTimesByStopAndRouteQuery = sub => formatGetQuery(sub, 'stop_times', ['stop_id', 'route_id']);

const formatGetStopsQuery = sub => formatGetQuery(sub, 'stops');

const formatGetStopQuery = sub => formatGetQuery(sub, 'stops', ['stop_id']);

const formatGetRoutesQuery = sub => formatGetQuery(sub, 'routes');

const formatGetRouteQuery = sub => formatGetQuery(sub, 'routes', ['route_id']);

const formatGetStopsByRouteQuery = sub => `SELECT * FROM \`${sub}_stop_routes\` sr INNER JOIN \`${sub}_stops\` ON sr.stop_id WHERE route_id = ?`;

const formatGetStopsByCoordsQuery = sub => `SELECT * FROM \`${sub}_stops\` s RIGHT JOIN \`${sub}_stop_routes\` sr ON s.stop_id = sr.stop_id`;

const getTimesByStop = (sub, stopId) => {
  const queryString = formatGetTimesByStopQuery(sub);
  return connection.query(queryString, stopId)
    .then((result) => {
      util.sortByTime(result);
      return result;
    });
};

const getTimesByRoute = (sub, routeId) => {
  const queryString = formatGetTimesByRouteQuery(sub);
  return connection.query(queryString, routeId)
    .then((result) => {
      util.sortByTime(result);
      return result;
    });
};

const getTimesByStopAndRoute = (sub, stopId, routeId) => {
  const queryString = formatGetTimesByStopAndRouteQuery(sub);
  return connection.query(queryString, [stopId, routeId])
    .then((result) => {
      util.sortByTime(result);
      return result;
    });
};

const getStops = (sub) => {
  const queryString = formatGetStopsQuery(sub);
  return connection.query(queryString);
};

const getStop = (sub, stopId) => {
  const queryString = formatGetStopQuery(sub);
  return connection.query(queryString, stopId);
};

const getRoutes = (sub) => {
  const queryString = formatGetRoutesQuery(sub);
  return connection.query(queryString);
};

const getRoute = (sub, routeId) => {
  const queryString = formatGetRouteQuery(sub);
  return connection.query(queryString, routeId);
};

const getStopsByRoute = (sub, routeId) => {
  const queryString = formatGetStopsByRouteQuery(sub);
  return connection.query(queryString, routeId);
};

const getStopsByCoords = (sub) => {
  const queryString = formatGetStopsByCoordsQuery(sub);
  return connection.query(queryString);
};

// Query formatting tools
const formatters = {
  formatKeyList,
  formatGetQuery,
  formatGetTimesByStopQuery,
  formatGetTimesByRouteQuery,
  formatGetTimesByStopAndRouteQuery,
  formatGetStopsQuery,
  formatGetStopQuery,
  formatGetRoutesQuery,
  formatGetRouteQuery,
  formatGetStopsByRouteQuery,
  formatGetStopsByCoordsQuery,
};

module.exports = {
  formatters,

  // Getters
  getTimesByStop,
  getTimesByRoute,
  getTimesByStopAndRoute,
  getStops,
  getStop,
  getRoutes,
  getRoute,
  getStopsByRoute,
  getStopsByCoords,
};
