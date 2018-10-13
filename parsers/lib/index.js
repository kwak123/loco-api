const fs = require('fs');
// const util = require('util');

/*
  TODO: For SAM -> These could even take in an optional cb to allow
  more flexibility 2/5/2018
*/

/**
 * Returns a parsed array fetched from the passed in file
 *
 * @param {*} fileName required parameter pointing to the desired stops.txt file
 */
/* eslint-disable no-param-reassign */
const getStops = filePath => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (err, content) => {
    // Failed to read
    if (err) {
      return reject(err);
    }

    // Successfully read
    content = content.split('\n');

    // All files are header prefixed
    const keys = content.shift().split(',');

    // Derive desired indexes
    const stopIdIdx = keys.findIndex(a => a === 'stop_id');
    const stopNameIdx = keys.findIndex(a => a === 'stop_name');
    const stopLatIdx = keys.findIndex(a => a === 'stop_lat');
    const stopLonIdx = keys.findIndex(a => a === 'stop_lon');

    const parsed = [];
    content.forEach((el) => {
      const vals = el.split(',');

      // MTA data has an extra new line, need to check, we need 4 indices
      if (vals.length < 4) {
        return;
      }

      const stopId = vals[stopIdIdx];
      const stopName = vals[stopNameIdx];
      const stopLat = vals[stopLatIdx];
      const stopLon = vals[stopLonIdx];
      parsed.push([stopId, stopName, stopLat, stopLon]);
    });
    return resolve(parsed);
  });
});

const getRoutes = fileName => new Promise((resolve, reject) => {
  fs.readFile(fileName, 'utf8', (err, content) => {
    // Failed to read
    if (err) {
      return reject(err);
    }

    // Successfully read
    content = content.split('\n').slice(0, -1);

    // Derive desired indexes
    const keys = content.shift().split(',');
    const idIdx = keys.findIndex(a => a === 'route_id');
    const descIdx = keys.findIndex(a => a === 'route_desc');

    content = content.map(a => a.split(/,(?!\s)/)); // Clean up routes text
    const parsed = [];
    content.forEach((el) => {
      // MTA data has an extra new line, need to check, we need 4 indices
      if (el[idIdx] === undefined || el[descIdx] === undefined) {
        return;
      }

      const routeId = el[idIdx];
      const routeDesc = el[descIdx].replace(/"/g, '');
      parsed.push([routeId, routeDesc]);
    });
    return resolve(parsed);
  });
});

/**
 * Most transit authorities seem to vary on how they handle stop_times.
 * This will attempt to cover the most possible ground, but some efficiency will be lost.
 * When adding a new parser, this is a good point of optimization
 *
 * Some authorities will use the trips.txt directly for weekday vs weekend.
 * The default tripsCallback will be expecting this to be the case.
 * tripsCallback will also be optional for transit specific optimization.
 *
 * In short, default callbacks will be slow but work for most authorities
 *
 * @param {*} stopTimesPath - Path to stop_times.txt
 * @param {*} tripsPath - Path to trips.txt
 * @param {*} stopTimesCallback - Optional cb for stop_times, must follow (resolve, reject) => {}
 * @param {*} tripsCallback - Optional cb for trips, must follow (resolve, reject) => {}
 */
// const getStopTimes = (stopTimesPath, tripsPath, stopTimesCallback, tripsCallback) => {
//   // No optional cb given, use default
//   if (!stopTimesCallback || stopTimesCallback.length !== 2) {
//     stopTimesCallback = (resolve, reject) => {

//     };
//   }
// };

// const _getTrips = (tripsPath, tripsCallback) => {

// };


// const _getTrips = (tripsPath, tripsCallback) => new Promise((resolve, reject) => {
//   fs.readFile(tripsPath, 'utf8', (err, content) => {
//     if (err) { return reject(err); }

//   });
// });

// new Promise ((resolve, reject) => {
//   fs.readFile(filePath, 'utf8', (err, content) => {
//     // Failed to read
//     if (err) { return reject(err); }

//     // Successfully read
//     content = content.split('\n').slice(0, -1); // MTA data has an excess line
//     const keys = content.shift().split(',');

//     // Derive desired indexes
//     const tripIdIdx = keys.findIndex((a) => a === 'trip_id');
//     const arrivalTimeIdx = keys.findIndex((a) => a === 'arrival_time');
//     const stopIdIdx = keys.findIndex((a) => a === 'stop_id');

//     const parsed = [];
//     content.forEach((el) => {
//       let vals = el.split(',');
//       if (!vals[0].includes('GS')) { // Don't want shuttles

//         let tripArray = vals[tripIdIdx].split('_');
//         let routeId = tripArray[2].split('.')[0];
//         let routeType = tripArray[0].slice(-3);
//         let arrivalTime = vals[arrivalTimeIdx];
//         let stopId = vals[stopIdIdx];
//         parsed.push([routeId, routeType, arrivalTime, stopId]);
//       }
//     });
//     resolve(parsed);
//   });
// });

/* eslint-enable no-param-reassign */

module.exports = {
  getStops,
  getRoutes,
};
