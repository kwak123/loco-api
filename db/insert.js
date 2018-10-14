const connection = require('./config');

/**
 * Handles all aspects regarding addition of data into db
 */

/* Queries */

const formatCreateStopTimesQuery = sub => `
  CREATE TABLE ${sub}_stop_times (
    id int NOT NULL AUTO_INCREMENT,
    route_id varchar(10) NOT NULL,
    route_type varchar(10) NOT NULL,
    arrival_time varchar(20) NOT NULL,
    stop_id varchar(10) NOT NULL,
    PRIMARY KEY (id)
  )
`;

const formatCreateStopsQuery = sub => `
  CREATE TABLE ${sub}_stops (
    id int NOT NULL AUTO_INCREMENT,
    stop_id varchar(10) NOT NULL,
    stop_name varchar(50) NOT NULL,
    stop_lat varchar(20) NOT NULL,
    stop_lon varchar(20) NOT NULL,
    PRIMARY KEY (id)
  )
`;

const formatCreateRoutesQuery = sub => `
  CREATE TABLE ${sub}_routes (
    id int NOT NULL AUTO_INCREMENT,
    route_id varchar(10) NOT NULL,
    route_desc varchar(2000) NOT NULL,
    PRIMARY KEY (id)
  )
`;

// This table created from existing data sets instead of fresh data
const formatInsertStopRoutesQuery = sub => `
  CREATE TABLE ${sub}_stop_routes (
    id int NOT NULL AUTO_INCREMENT,
    route_id varchar(10) NOT NULL,
    stop_id varchar(10) NOT NULL,
    PRIMARY KEY(id)
  )
  SELECT DISTINCT route_id, stop_id 
  FROM ${sub}_stop_times
`;

const formatInsertStopTimesQuery = sub => `
  INSERT INTO ${sub}_stop_times (route_id, route_type, arrival_time, stop_id) VALUES ?
`;

const formatInsertStopsQuery = sub => `
  INSERT INTO ${sub}_stops (stop_id, stop_name, stop_lat, stop_lon) VALUES ?;
`;

const formatInsertRoutesQuery = sub => `
  INSERT INTO ${sub}_routes (route_id, route_desc) VALUES ?
`;

/* Helpers */
/**
 * Promise-wraps the connection.query method exposed from mysql lib
 * @param {String} queryString String created using one of the query builders above
 */
const createTable = queryString => connection.query(queryString);

/**
 * Promise-wraps the connection.query method exposed from mysql lib
 * @param {String} queryString String created using one of the query builders above
 */
const insertData = (queryString, data) => {
  if (data) {
    return connection.query(queryString, [data]);
  }
  return connection.query(queryString);
};

/* Exposed methods */
const createAllTables = (sub) => {
  const stopsQuery = formatCreateStopsQuery(sub);
  const routesQuery = formatCreateRoutesQuery(sub);
  const stopTimesQuery = formatCreateStopTimesQuery(sub);
  return createTable(stopsQuery)
    .then(() => createTable(routesQuery))
    .then(() => createTable(stopTimesQuery));
};

const insertStopTimes = (sub, data) => {
  const insertStopTimesQuery = formatInsertStopTimesQuery(sub);
  const partialInsert = (stopsData) => {
    const splitData = stopsData.splice(0, 10000);
    return insertData(insertStopTimesQuery, splitData)
      .then((result) => {
        if (stopsData.length) {
          return partialInsert(stopsData);
        }
        return result;
      });
  };
  return partialInsert(data);
};

const insertStops = (sub, data) => {
  const insertStopsQuery = formatInsertStopsQuery(sub);
  return insertData(insertStopsQuery, data);
};

const insertRoutes = (sub, data) => {
  const insertRoutesQuery = formatInsertRoutesQuery(sub);
  return insertData(insertRoutesQuery, data);
};

const insertStopRoutes = (sub) => {
  const insertStopRoutesQuery = formatInsertStopRoutesQuery(sub);
  return insertData(insertStopRoutesQuery);
};

const insertAll = (sub, data) => {
  const { stoptimes, stops, routes } = data;
  return insertStopTimes(sub, stoptimes)
    .then(() => insertStops(sub, stops))
    .then(() => insertRoutes(sub, routes))
    .then(() => insertStopRoutes(sub));
};

module.exports = {
  createAllTables,
  insertStopTimes,
  insertStops,
  insertRoutes,
  insertStopRoutes,
  insertAll,
};
