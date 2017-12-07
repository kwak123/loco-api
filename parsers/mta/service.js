const xml2js = require('xml2js');
const http = require('http');
const { PUBLIC_URLS } = require('../../env');
const htmlRegExp = require('../../lib/util').htmlRegExp; // MTA service data polluted with raw HTML

const fetchServiceStatus = () => new Promise((resolve, reject) => {
  http.get(PUBLIC_URLS.MTA_SERVICE, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('error', (error) => reject(error));
    res.on('end', () => {
      xml2js.parseString(data, (error, { service }) => {
        if (error) { return reject(error); }
        let data = {
          responsecode: service.responsecode[0],
          timestamp: service.timestamp[0],
          lines: service.subway[0].line.map((a) => {
            for (let key in a) { a[key] = a[key][0]; }
            a.text = a.text.replace(matcher, '').split(' ').filter((a) => a).join(' ');
            a.Time = a.Time.trim();
            return a;
          })
        };
        resolve(data);
      });
    });
  });
});

module.exports = {
  fetchServiceStatus
};