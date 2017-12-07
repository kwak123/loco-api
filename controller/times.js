const db = require('../db');

const timesByStop = (req, res) => {
  let sub = req.query.sub;
  let stopId = req.query.stop_id;
  db.getTimesByStop(sub, stopId)
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

const timesByRoute = (req, res) => {
  let sub = req.query.sub;
  let routeId = req.query.routeId;
  db.getTimesByRoute(sub, routeId)
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

const timesByStopRoute = (req, res) => {
  let sub = req.query.sub;
  let stopId = req.query.stop_id;
  let routeId = req.query.route_id;
  db.getTimesByStopAndRoute(sub, stopId, routeId)
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

module.exports = {
  timesByStop,
  timesByRoute,
  timesByStopRoute
};