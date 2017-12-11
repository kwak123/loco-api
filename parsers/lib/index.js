const fs = require('fs');
const util = require('util');

/**
 * Returns a parsed array fetched from the passed in file
 * 
 * @param {*} fileName required parameter pointing to the desired stops.txt file
 */
const getStops = (fileName) => new Promise((resolve, reject) => {
  fs.readFile(fileName, 'utf8', (error, content) => {
    if (error) { return reject(error); }

    // Divides content and removes the empty string due to the last \n
    content = content.split('\n').slice(0, -1);

    // GTFS specifications indicate all files should be prefaced with headers
    let keys = content.shift().split(',');

    // Start iteration
    let parsed = content.reduce((acc, elem) => {
      let vals = elem.split(',');
      // Our desired keys are:
      // 0: stop_id, 1: stop_name, 3: stop_lat, 4: stop_lon
      let stopId = vals[0]; 
      let stopName = vals[1];
      let stopLat = vals[3];
      let stopLon = vals[4];
      acc.push([stopId, stopName, stopLat, stopLon]);
      return acc;
    }, []);

    // Completed
    resolve(parsed);
  });
});

const getRoutes = (fileName) => new Promise((resolve, reject) => {
  fs.readFile(fileName, 'utf8', (error, content) => {
    if (error) { return reject(error); }

    // Divides content and removes the empty string due to the last \n
    content = content.split('\n').slice(0, -1);

    // GTFS specifications indicate all files should be prefaced with headers
    let keys = content.shift().split(',');

    // We are going to need a different split to account for potential spaces within the trip name
    content = content.map((a) => a.split(/,(?!\s)/));

    // Start iteration
    const parsed = content.reduce((acc, elem) => {
      let routeId = el[0];
      // let routeDesc = el[4].replace(/\"/g, ")
    });
    resolve(parsed);
  });
});