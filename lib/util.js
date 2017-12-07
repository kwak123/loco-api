const sortByDirection = (data) => data.reduce((acc, b) => {
  b.stop_id.match(/N$/) ? acc.N.push(b) : acc.S.push(b);
  return acc;
}, { N: [], S: []}
);

const sortByTime = (data) => data.sort((a, b) => a.arrival_time < b.arrival_time ? -1 : a.arrival_time > b.arrival_time ? 1 : 0);

const htmlRegExp = new RegExp(/\r|\n|&nbsp;|<\/?[^>]+(>|$)/g);

module.exports = {
  sortByDirection,
  sortByTime,
  htmlRegExp
};