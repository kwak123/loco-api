const db = require('../db');

const getRoutes = (req, res) => {
  const { sub } = req.query;
  db.getRoutes(sub)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      /* eslint-disable-next-line no-console */
      console.log(error);
      res.sendStatus(404);
    });
};

const getRoute = (req, res) => {
  const { sub, route_id: routeId } = req.query;
  db.getRoute(sub, routeId)
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
  getRoutes,
  getRoute,
};
