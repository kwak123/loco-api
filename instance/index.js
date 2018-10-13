// const { setTimeout } = require('timers');

// Ideally, you'd add parsers here to expand data requests
// They need to be promises for the sake of service scheduler
const mtaServiceFetcher = require('../parsers').mta.serviceParser.fetchServiceStatus;

// Keys and fetchers need to maintain a 1 to 1 ratio to maintain data organization
const SUBS = ['mta'];

const _instance = { service: {} };
// let initialized = false;

/* Service data */
const _serviceScheduler = () => {
  // Invoke fetcher promises here
  // initialized = true;
  Promise.all([mtaServiceFetcher()])
    .then((results) => {
      results.forEach((el, i) => {
        _instance.service[SUBS[i]] = el;
      });
      setTimeout(_serviceScheduler, 1000 * 60 * 5);
    })
    /* eslint-disable-next-line no-console */
    .catch(error => console.log(error));
};

// Start the fetcher
_serviceScheduler();

/* Getters */

const getServiceData = (sub) => {
  if (!_instance.service || !_instance.service[sub]) {
    return false;
  }
  return _instance.service[sub];
};

const getServiceRouteData = (sub, routeId) => {
  if (!_instance.service) {
    return false;
  }
  return _instance.service[sub].lines.find(line => line.name.includes(routeId));
};

/**
 * Not sure what this does just yet
 */

module.exports = {
  getServiceData,
  getServiceRouteData,
};
