const instance = require('../instance');

const getService = (req, res) => {
  const { sub } = req.query;
  const data = instance.getServiceData(sub);
  if (data) {
    res.send(data);
  }
  else {
    res.sendStatus(404);
  }
};

const getServiceByRoute = (req, res) => {
  const { sub, route_id: routeId } = req.query.sub;
  const data = instance.getServiceRouteData(sub, routeId);
  if (data) {
    res.send(data);
  }
  else {
    res.sendStatus(404);
  }
};

module.exports = {
  getService,
  getServiceByRoute,
};
