const db = require('../db');

const timesByStop = (req, res) => {
  const { sub, stop_id: stopId } = req.query;
  db.getTimesByStop(sub, stopId)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      /* eslint-disable-next-line no-console */
      console.log(error);
      res.sendStatus(404);
    });
};

const timesByRoute = (req, res) => {
  const { sub, route_id: routeId } = req.query;
  db.getTimesByRoute(sub, routeId)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      /* eslint-disable-next-line no-console */
      console.log(error);
      res.sendStatus(404);
    });
};

const timesByStopRoute = (req, res) => {
  const { sub, stop_id: stopId, route_id: routeId } = req.query;
  db.getTimesByStopAndRoute(sub, stopId, routeId)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      /* eslint-disable-next-line no-console */
      console.log(error);
      res.sendStatus(404);
    });
};

module.exports = {
  timesByStop,
  timesByRoute,
  timesByStopRoute,
};
