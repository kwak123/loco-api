const fs = require('fs');
const util = require('util');

/**
 * Returns a promise containing all stop routes
 */
const _getStops = () => new Promise((resolve, reject) => {
  fs.readFile(__dirname + '/static/stops.txt', 'utf8', (err, content) => {
    if (err) {
      reject(err);
    } else {
      content = content.split('\n').slice(0, -1);
      let keys = content.shift().split(',');
      let parsed = [];
      content.forEach((el) => {
        let vals = el.split(',');
        // 0: stop_id, 2: stop_name, 4: stop_lat, 5: stop_lon
        let stopId = vals[0];
        let stopName = vals[2];
        let stopLat = vals[4];
        let stopLon = vals[5];
        parsed.push([stopId, stopName, stopLat, stopLon]);
      });
      resolve(parsed);
    }
  });
});

/**
 * Returns a promise containing all available MTA schedule data
 */
const _getStopTimes = () => new Promise ((resolve, reject) => {
  fs.readFile(__dirname + '/static/stop_times.txt', 'utf8', (err, content) => {
    if (err) { return reject(err); }
    content = content.split('\n').slice(0, -1);
    const keys = content.shift().split(',');
    const parsed = [];
    content.forEach((el) => {
      let vals = el.split(',');
      if (!vals[0].includes('GS')) { // Don't want shuttles
        // 0 = trip_id, 1 = arrival_time, 4 = stop_id
        let tripArray = vals[0].split('_');
        let routeId = tripArray[2].split('.')[0];
        let routeType = tripArray[0].slice(-3);
        let arrivalTime = vals[1];
        let stopId = vals[3];
        parsed.push([routeId, routeType, arrivalTime, stopId]);
      }
    });
    resolve(parsed);
  });
});

/**
 * Returns a promise containing all route data, including IDs and names
 */
const _getRoutes = () => new Promise ((resolve, reject) => {
  fs.readFile(__dirname + '/static/routes.txt', 'utf8', (err, content) => {
    if (err) { return reject(err) }
    content = content.split('\n').slice(0, -1);
    const keys = content.shift().split(',');
    content = content.map((a) => a.split(/,(?!\s)/)); // Clean up routes text
    const parsed = [];
    content.forEach((el) => {
      // 0 = route_id, 4 = route_desc
      let routeId = el[0];
      let routeDesc = el[4].replace(/\"/g, '');
      parsed.push([routeId, routeDesc]);
    });
    resolve(parsed);
  });
});

/**
 * Exposed function to fetch all the above data in one go
 */
const getAll = () => new Promise((resolve, reject) => {
  let dataObj = {};
  _getStops()
  .then((stops) => {
    dataObj.stops = stops;
    return _getRoutes();
  })
  .then((routes) => {
    dataObj.routes = routes;
    return _getStopTimes();
  })
  .then((stoptimes) => {
    dataObj.stoptimes = stoptimes;
    resolve(dataObj);
  })
  .catch((error) => {
    console.log(error);
    reject(error);
  });
});

module.exports = {
  getAll
};
