const instance = require('../instance');

const getService = (req, res) => {
  let sub = req.query.sub;
  let data = instance.getServiceData(sub);
  if (data) {
    res.send(data);
  } else {
    res.sendStatus(404);
  }
};

const getServiceByRoute = (req, res) => {
  let sub = req.query.sub;
  let routeId = req.query.route_id;
  let data = instance.getServiceRouteData(sub, routeId);
  if (data) {
    res.send(data);
  } else {
    res.sendStatus(404);
  }
};

module.exports = {
  getService,
  getServiceByRoute
};