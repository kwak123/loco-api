const db = require('../db');
const geodist = require('geodist');

const getStops = (req, res) => {
  let sub = req.query.sub;
  db.getStops(sub)
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

const getStop = (req, res) => {
  let sub = req.query.sub;
  let stopId = req.query.stop_id;
  db.getStop(sub, stopId)
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

const getStopsByRoute = (req, res) => {
  let sub = req.query.sub;
  let routeId = req.query.route_id;
  db.getStopsByRoute(sub, routeId)
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

const getStopsByCoords = (req, res) => {
  let sub = req.query.sub;
  let lat = req.query.lat;
  let lon = req.query.lon;
  db.getStopsByCoords(sub)
  .then((data) => {
    let stops = data.reduce((acc, stop) => {
      let currentLat = Number(stop.stop_lat);
      let currentLon = Number(stop.stop_lon);
      let distance = geodist({ lat, lon }, { lat: currentLat, lon: currentLon }, {exact: true, unit: 'miles'});
      if (distance <= 0.5) { acc.push(stop); }
      return acc;
    }, []);
    res.send(stops);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

module.exports = {
  getStops,
  getStop,
  getStopsByRoute,
  getStopsByCoords
};