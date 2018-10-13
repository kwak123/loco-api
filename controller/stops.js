const geodist = require('geodist');
const db = require('../db');

const getStops = (req, res) => {
  const { sub } = req.query;
  db.getStops(sub)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      /* eslint-disable-next-line no-console */
      console.log(error);
      res.sendStatus(404);
    });
};

const getStop = (req, res) => {
  const { sub, stop_id: stopId } = req.query;
  db.getStop(sub, stopId)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      /* eslint-disable-next-line no-console */
      console.log(error);
      res.sendStatus(404);
    });
};

const getStopsByRoute = (req, res) => {
  const { sub, route_id: routeId } = req.query;
  db.getStopsByRoute(sub, routeId)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      /* eslint-disable-next-line no-console */
      console.log(error);
      res.sendStatus(404);
    });
};

const getStopsByCoords = (req, res) => {
  const { sub, lat, lon } = req.query;
  db.getStopsByCoords(sub)
    .then((data) => {
      const stops = data.reduce((acc, stop) => {
        const currentLat = Number(stop.stop_lat);
        const currentLon = Number(stop.stop_lon);
        const distance = geodist(
          { lat, lon },
          { lat: currentLat, lon: currentLon },
          { exact: true, unit: 'miles' },
        );
        if (distance <= 0.5) { acc.push(stop); }
        return acc;
      }, []);
      res.send(stops);
    })
    .catch((error) => {
      /* eslint-disable-next-line no-console */
      console.log(error);
      res.sendStatus(404);
    });
};

module.exports = {
  getStops,
  getStop,
  getStopsByRoute,
  getStopsByCoords,
};
