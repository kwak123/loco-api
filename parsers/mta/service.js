const xml2js = require('xml2js');
const http = require('http');
const { PUBLIC_URLS } = require('../../env');
const { htmlRegExp } = require('../../lib/util'); // MTA service data polluted with raw HTML

// TODO: 10/13/2018 This one is a doozy, gonna have to rewrite
/* eslint-disable */
const fetchServiceStatus = () => new Promise((resolve, reject) => {
  http.get(PUBLIC_URLS.MTA_SERVICE, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('error', error => reject(error));
    res.on('end', () => {
      xml2js.parseString(data, (error, { service }) => {
        if (error) {
          return reject(error);
        }
        const parsedData = {
          responsecode: service.responsecode[0],
          timestamp: service.timestamp[0],
          lines: service.subway[0].line.map((a) => {
            for (let key in a) { a[key] = a[key][0]; }
            a.text = a.text.replace(htmlRegExp, '').split(' ').filter((a) => a).join(' ');
            a.Time = a.Time.trim();
            return a;
          }),
        };
        return resolve(parsedData);
      });
    });
  });
});
/* eslint-enable */

module.exports = {
  fetchServiceStatus,
};
