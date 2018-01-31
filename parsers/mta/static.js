const fs = require('fs');
const util = require('util');

/**
 * Returns a promise containing all stop routes. Only provide path if intendin
 */
const _getStops = (rootPath = __dirname) => new Promise((resolve, reject) => {
  fs.readFile(`${rootPath}/static/stops.txt`, 'utf8', (err, content) => {
    if (err) {
      reject(err);
    } else {
      content = content.split('\n').slice(0, -1); // MTA data has an extra new line
      let keys = content.shift().split(',');

      // Derive desired indexes
      const stopIdIdx = keys.findIndex((a) => a === 'stop_id');
      const stopNameIdx = keys.findIndex((a) => a === 'stop_name');
      const stopLatIdx = keys.findIndex((a) => a === 'stop_lat');
      const stopLonIdx = keys.findIndex((a) => a === 'stop_lon');

      let parsed = [];
      content.forEach((el) => {
        let vals = el.split(',');
        // 0: stop_id, 2: stop_name, 4: stop_lat, 5: stop_lon
        let stopId = vals[stopIdIdx];
        let stopName = vals[stopNameIdx];
        let stopLat = vals[stopLatIdx];
        let stopLon = vals[stopLonIdx];
        parsed.push([stopId, stopName, stopLat, stopLon]);
      });
      resolve(parsed);
    }
  });
});

/**
 * Returns a promise containing all available MTA schedule data
 */
const _getStopTimes = (rootPath = __dirname) => new Promise ((resolve, reject) => {
  fs.readFile(`${rootPath}/static/stop_times.txt`, 'utf8', (err, content) => {
    if (err) { return reject(err); }
    content = content.split('\n').slice(0, -1); // MTA data has an excess line
    const keys = content.shift().split(',');

    // Derive desired indexes
    const tripIdIdx = keys.findIndex((a) => a === 'trip_id');
    const arrivalTimeIdx = keys.findIndex((a) => a === 'arrival_time');
    const stopIdIdx = keys.findIndex((a) => a === 'stop_id');
    
    const parsed = [];
    content.forEach((el) => {
      let vals = el.split(',');
      if (!vals[0].includes('GS')) { // Don't want shuttles
        // 0 = trip_id, 1 = arrival_time, 4 = stop_id

        // This is MTA specific
        let tripArray = vals[tripIdIdx].split('_');
        let routeId = tripArray[2].split('.')[0];
        let routeType = tripArray[0].slice(-3);
        let arrivalTime = vals[arrivalTimeIdx];
        let stopId = vals[stopIdIdx];
        parsed.push([routeId, routeType, arrivalTime, stopId]);
      }
    });
    resolve(parsed);
  });
});

/**
 * Returns a promise containing all route data, including IDs and names
 */
const _getRoutes = (rootPath = __dirname) => new Promise ((resolve, reject) => {
  fs.readFile(`${rootPath}/static/routes.txt`, 'utf8', (err, content) => {
    if (err) { return reject(err) }
    content = content.split('\n').slice(0, -1);

    // Derive desired indexes
    const keys = content.shift().split(',');
    const idIdx = keys.findIndex((a) => a === 'route_id');
    const descIdx = keys.findIndex((a) => a === 'route_desc');

    content = content.map((a) => a.split(/,(?!\s)/)); // Clean up routes text
    const parsed = [];
    content.forEach((el) => {
      let routeId = el[idIdx];
      let routeDesc = el[descIdx].replace(/\"/g, '');
      parsed.push([routeId, routeDesc]);
    });
    resolve(parsed);
  });
});

/**
 * Main function to fetch all the above data in one go
 */
const getAll = (rootPath = __dirname) => new Promise((resolve, reject) => {
  let dataObj = {};
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
    console.log('failed in MTA getAll', error);
    reject(error);
  });
});

module.exports = {
  getAll,
  // Below mainly used for test
  _getStops,
  _getStopTimes,
  _getRoutes
};

