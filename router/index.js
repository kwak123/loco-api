const router = require('express').Router();
const controller = require('../controller');

/*
 * These are going to vary from city to city. Majority are the same but New York is the big outlier here
 * Service status will be difficult to provide for certain cities
 * 
 * route_type will need to be accounted for in db table creation somehow
 */


 
/* Stops */

// Get all available stops for a particular sub
// e.g. /loco/stops?sub=mta
router.get('/loco/stops', controller.stops.getStops);

// Get a stop by stop_id for a particular sub
// e.g. /loco/stop?sub=mta&stop_id=101N
router.get('/loco/stop', controller.stops.getStop);

// Get all stops by route id
// e.g. /loco/stop/route?sub=mta&route_id=7
router.get('/loco/', controller.stops.getStopsByRoute);



/* Routes */

// Get all available routes for a particular sub
// e.g. /loco/routes?sub=mta
router.get('/loco/routes', controller.routes.getRoutes);

// Get a route by route_id for a particular sub
// e.g. /loco/route?sub=mta&route_id=7
router.get('/loco/route', controller.routes.getRoute);



/* Stop Times */

// Get times by stop_id for a particular sub
// e.g. /loco/times/stop?sub=mta&stop_id=101N
router.get('/loco/times/stop', controller.times.timesByStop);

// Get times by route_id for a particular sub
// e.g. /loco/times/route?sub=mta&route_id=1
router.get('/loco/times/route', controller.times.timesByRoute);;

// Get times by stop_id and route_id for a particular sub
// e.g. /loco/times/stop?sub=mta&stop_id=101N&route_id=1
router.get('/loco/times/stoproute', controller.times.timesByStopRoute);



/* Service Data */

// Get all service data for a particular sub
// e.g. /loco/service?sub=mta
router.get('/loco/service', controller.service.getService);

// Get all service data by route_id for a particular sub
// e.g. /loco/service/route?sub=mta&route_id=7
router.get('/loco/service/route', controller.service.getServiceByRoute);



/* Priviliged routes */
router.get('/loco/privileged/updatedb', controller.admin.updateDB);

module.exports = {
  router
};