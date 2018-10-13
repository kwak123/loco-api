const northBoundReducer = (acc, route) => {
  const northBound = route.stop_id.match(/N$/);
  if (northBound) {
    acc.N.push(route);
  }
  else {
    acc.S.push(route);
  }
  return acc;
};

const timeSorter = (first, second) => {
  if (first.arrival_time < second.arrival_time) {
    return -1;
  }
  if (first.arrival_time > second.arrival_time) {
    return 1;
  }
  return 0;
};

const sortByDirection = data => data.reduce(northBoundReducer, { N: [], S: [] });

const sortByTime = data => data.sort(timeSorter);

const htmlRegExp = new RegExp(/\r|\n|&nbsp;|<\/?[^>]+(>|$)/g);

module.exports = {
  sortByDirection,
  sortByTime,
  htmlRegExp,
};
