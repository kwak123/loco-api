const db = require('../db');

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

module.exports = {
  getStops,
  getStop,
  getStopsByRoute
};