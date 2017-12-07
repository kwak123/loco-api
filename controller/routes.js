const db = require('../db');

const getRoutes = (req, res) => {
  let sub = req.query.sub;
  db.getRoutes(sub)
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

const getRoute = (req, res) => {
  let sub = req.query.sub;
  let routeId = req.query.route_id;
  db.getRoute(sub, routeId)
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(404);
  });
};

module.exports = {
  getRoutes,
  getRoute
};