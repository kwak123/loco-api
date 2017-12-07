const router = require('express').Router();
const controller = require('../controller');

/**
 * These are going to vary from city to city. Majority are the same but New York is the big outlier here
 * Service status will be difficult to provide for certain cities
 * 
 * route_type will need to be accounted for in db table creation somehow
 */


/* Stops */

// Get all available stops for a particular sub
// e.g. /loco/stops?sub=mta
router.get('/loco/stops', )

// Get a stop by stop_id for a particular sub
// e.g. /loco/stop?sub=mta&stop_id=101N
router.get('/loco/stop', );



/* Routes */

// Get all available routes for a particular sub
// e.g. /loco/routes?sub=mta
router.get('/loco/routes', );

// Get a route by route_id for a particular sub
// e.g. /loco/route?sub=mta&route_id=7
router.get('/loco/route', );



/* Stop Times */

// Get schedule by stop_id for a particular sub
// e.g. /loco/schedule/stop?sub=mta&stop_id=101N
router.get('/loco/schedule/stop', );

// Get schedule by route_id for a particular sub
// e.g. /loco/schedule/route?sub=mta&route_id=1
router.get('/loco/schedule/route', );

// Get schedule by stop_id and route_id for a particular sub
// e.g. /loco/schedule/stop?sub=mta&stop_id=101N&route_id=7
router.get('/loco/schedule/stoproute', );



/* Service Data */

// Get all service data for a particular sub
// e.g. /loco/service?sub=mta
router.get('/api/service', );

// Get all service data by route_id for a particular sub
// e.g. /loco/service/route?sub=mta&route_id=7
router.get('/api/service/route', );