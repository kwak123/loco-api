const mta = require('./mta');

// Meta module
module.exports = {
  mta: {
    serviceParser: mta.serviceParser,
    staticParser: mta.staticParser
  }
};