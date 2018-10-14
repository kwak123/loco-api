const get = require('./get');
const insert = require('./insert');
const drop = require('./drop');

// Add new fetchers here
const mtaParser = require('../parsers').mta.staticParser;
// Remember to put the fetcher into this object for retrieval
const PARSERS = {
  mta: mtaParser,
};

const validateParsedData = (data) => {
  let validated = true;
  /* eslint-disable no-console */
  if (!data.stoptimes || !data.stoptimes.length) {
    console.error('Error parsing stoptimes');
    validated = false;
  }
  if (!data.stops || !data.stops.length) {
    console.error('Error parsing stops');
    validated = false;
  }
  if (!data.routes || !data.routes.length) {
    console.error('Error parsing routes');
    validated = false;
  }
  /* eslint-enable no-console */
  return validated;
};

// All outward methods below. Requests with invalid subs will receive a null response

const updateSchedule = (sub = '') => {
  if (!sub || typeof sub !== 'string') {
    return null;
  }
  if (!PARSERS[sub]) {
    return null;
  }
  let data;
  return PARSERS[sub].getAll()
    .then((parsedData) => {
      if (!validateParsedData(parsedData)) {
        const error = { errorMsg: 'Failed to validated parsed data' };
        throw error;
      }
      data = parsedData;
      return drop.dropTables(sub);
    })
    .then(() => insert.createAllTables(sub))
    .then(() => insert.insertAll(sub, data))
    .then((result) => {
      /* eslint-disable-next-line no-console */
      console.log(`Successfully updated schedule for: ${sub}`);
      return result;
    })
    .catch((error) => {
      /* eslint-disable-next-line no-console */
      console.error(`Failed to parse sub data for ${sub}`, error);
      return error;
    });
};

const getTimesByStop = (sub, stopId) => get.getTimesByStop(sub, stopId);

const getTimesByRoute = (sub, routeId) => get.getTimesByRoute(sub, routeId);

const getTimesByStopAndRoute = (sub, stopId, routeId) => get.getTimesByStopAndRoute(sub, stopId, routeId);

const getStops = sub => get.getStops(sub);

const getStop = (sub, stopId) => get.getStop(sub, stopId);

const getRoutes = sub => get.getRoutes(sub);

const getRoute = (sub, routeId) => get.getRoute(sub, routeId);

const getStopsByRoute = (sub, routeId) => get.getStopsByRoute(sub, routeId);

const getStopsByCoords = sub => get.getStopsByCoords(sub);

module.exports = {
  updateSchedule,
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
