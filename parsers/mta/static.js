const fs = require('fs');
const util = require('../lib');

/*
  The order of these insertions MUST be strictly maintained.
  The nature of the SQL insert queries is reliant upon these
  being inserted in a reliable order
*/

/**
 * Returns a promise that resolves with all stops from txt file
 *
 * @param {*} rootPath optional param, only really used for testing
 */
const _getStops = (rootPath = __dirname) => util.getStops(`${rootPath}/static/stops.txt`);

/**
 * Returns a promise containing all route data, including IDs and names
 */
const _getRoutes = (rootPath = __dirname) => util.getRoutes(`${rootPath}/static/routes.txt`);

/**
 * Returns a promise containing all available MTA schedule data
 */
const _getStopTimes = (rootPath = __dirname) => new Promise((resolve, reject) => {
  fs.readFile(`${rootPath}/static/stop_times.txt`, 'utf8', (err, content) => {
    if (err) {
      return reject(err);
    }
    // TODO: Revisit how to not disable eslint here
    /* eslint-disable-next-line no-param-reassign */
    content = content.split('\n').slice(0, -1); // MTA data has an excess line
    const keys = content.shift().split(',');

    // Derive desired indexes
    const tripIdIdx = keys.findIndex(a => a === 'trip_id');
    const arrivalTimeIdx = keys.findIndex(a => a === 'arrival_time');
    const stopIdIdx = keys.findIndex(a => a === 'stop_id');

    const parsed = [];
    content.forEach((el) => {
      const vals = el.split(',');
      if (!vals[0].includes('GS')) { // Don't want shuttles
        // 0 = trip_id, 1 = arrival_time, 4 = stop_id

        // This is MTA specific
        const tripArray = vals[tripIdIdx].split('_');
        const routeId = tripArray[2].split('.')[0];
        const routeType = tripArray[0].slice(-3);
        const arrivalTime = vals[arrivalTimeIdx];
        const stopId = vals[stopIdIdx];
        parsed.push([routeId, routeType, arrivalTime, stopId]);
      }
    });
    return resolve(parsed);
  });
});

/**
 * Main function to fetch all the above data in one go
 * @param {string} rootPath rootpath to enter static files
 */
const getAll = (rootPath = __dirname) => new Promise((resolve, reject) => {
  const dataObj = {};
  _getStops(rootPath)
    .then((stops) => {
      dataObj.stops = stops;
      return _getRoutes(rootPath);
    })
    .then((routes) => {
      dataObj.routes = routes;
      return _getStopTimes(rootPath);
    })
    .then((stoptimes) => {
      dataObj.stoptimes = stoptimes;
      resolve(dataObj);
    })
    .catch((error) => {
      /* eslint-disable-next-line no-console */
      console.error('failed in MTA getAll', error);
      reject(error);
    });
});

module.exports = {
  getAll,
  // Below mainly used for test
  _getStops,
  _getStopTimes,
  _getRoutes,
};
