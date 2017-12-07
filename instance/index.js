const { setTimout } = require('timers');

// Ideally, you'd add parsers here to expand data requests
// They need to be promises for the sake of service scheduler
const mtaServiceFetcher = require('../parsers').mta.serviceParser.fetchServiceStatus;

// Keys and fetchers need to maintain a 1 to 1 ratio to maintain data organization
const SUBS = ['mta']

// TBD for when API also handles real-time data
// const Models = require('../models/complaint'); TBD
// const Complaint = Models.Complaint;
// const Report = Models.Report;

const _instance = {
  service: {},
  complaints: [] // Not sure how to handle this yet
};

let initialized = false;

const initialize = () => {
  if (initialized) { return; }
  console.log('initializing');  
  _serviceScheduler();
  // let complaintTypes = ['delayed', 'closed', 'accident', 'crowded'];
  // _instance.complaints = complaintTypes.map((type) => new Complaint(type));
  initialized = true;
};

const _serviceScheduler = () => {
  // Invoke fetcher promises here
  Promise.all([mtaServiceFetcher()])
  .then((results) => {
    results.forEach((el, i) => {
      _instance.service[SUBS[i]] = el;
    });
    setTimeout(_serviceScheduler, 1000 * 60 * 5);
  })
  .catch((error) => console.log(error));
};

// const addComplaintReport = (type, stopId, routeId) => {
//   let complaint = _instance.complaints.find((a) => a.type === type);
//   if (complaint) {
//     let count = complaint.addReport({ stopId, routeId });
//     return count < 0 ? false : count;
//   } else {
//     return false;
//   }
// };

// const subtractComplaintReport = (type, stopId, routeId) => {
//   let complaint = _instance.complaints.find((a) => a.type === type);
//   if (complaint) {
//     let count = complaint.subtractReport({ stopId, routeId });
//     return count < 0 ? false : count; // Handle unfound report
//   } else {
//     return false;
//   }
// };

// const getComplaintReport = (type, stopId, routeId) => {
//   let complaint = _instance.complaints.find((a) => a.type === type);
//   if (complaint) {
//     return complaint.getReport({ stopId, routeId }); // Will send null if not found
//   } else {
//     return false;
//   }
// };

const getServiceData = (sub) => {
  console.log(_instance);
  if (!_instance.service || !_instance.service[sub]) { return false; }
  return _instance.service[sub];
};

const getServiceRouteData = (sub, routeId) => {
  if (!_instance.service) { return false; }
  return _instance.service[sub].lines.find((a) => a.name.includes(routeId));
};

module.exports = {
  initialize,
  // addComplaintReport,
  // subtractComplaintReport,
  // getComplaintReport,
  getServiceData,
  getServiceRouteData
};