const get = require('../../db/get');

describe('db get', () => {
  describe('formatters', () => {
    const { formatters } = get;

    describe('helpers', () => {
      describe('formatKeyList', () => {
        const { formatKeyList } = formatters;
        it('returns empty string if given empty array', () => {
          const result = formatKeyList([]);
          expect(result).toEqual('');
        });

        it('creates expected string shape with one key', () => {
          const keyList = ['test'];
          const expected = 'WHERE `test` = ?';
          const result = formatKeyList(keyList);
          expect(result).toEqual(expected);
        });

        it('joins with AND if multiple keys', () => {
          const keyList = ['one', 'two'];
          const expected = 'WHERE `one` = ? AND `two` = ?';
          const result = formatKeyList(keyList);
          expect(result).toEqual(expected);
        });
      });

      // key list tests will validate later half
      describe('formatGetQuery', () => {
        const { formatGetQuery } = formatters;
        let testSub;
        let testTableType;
        let testKeyList;

        const getFormattedQuery = () => formatGetQuery(testSub, testTableType, testKeyList);

        beforeEach(() => {
          testSub = 'mta';
          testTableType = 'stops';
          testKeyList = [];
        });

        it('first 3 words are SELECT * FROM', () => {
          const expected = ['SELECT', '*', 'FROM'];
          const resultString = getFormattedQuery();
          const resultArray = resultString.split(' ');
          expect(resultArray.slice(0, 3)).toEqual(expected);
        });

        it('4th word is the sub type joined with table type by underscore, wrapped in backticks', () => {
          const expected = `\`${testSub}_${testTableType}\``;
          const resultString = getFormattedQuery();
          const resultArray = resultString.split(' ');
          expect(resultArray[3]).toEqual(expected);
        });

        it('test formatted key with one key', () => {
          testKeyList.push('test');
          const expected = 'SELECT * FROM `mta_stops` WHERE `test` = ?';
          const result = getFormattedQuery();
          expect(result).toEqual(expected);
        });

        it('test formatted keys with two keys', () => {
          testKeyList.push('one');
          testKeyList.push('two');
          const expected = 'SELECT * FROM `mta_stops` WHERE `one` = ? AND `two` = ?';
          const result = getFormattedQuery();
          expect(result).toEqual(expected);
        });
      });
    });
    describe('queries', () => {
      const testSub = 'mta';

      it('formatGetTimesByStopQuery', () => {
        const expected = 'SELECT * FROM `mta_stop_times` WHERE `stop_id` = ?';
        const result = formatters.formatGetTimesByStopQuery(testSub);
        expect(result).toEqual(expected);
      });

      it('formatGetTimesByRouteQuery', () => {
        const expected = 'SELECT * FROM `mta_stop_times` WHERE `route_id` = ?';
        const result = formatters.formatGetTimesByRouteQuery(testSub);
        expect(result).toEqual(expected);
      });

      it('formatGetTimesByStopAndRouteQuery', () => {
        const expected = 'SELECT * FROM `mta_stop_times` WHERE `stop_id` = ? AND `route_id` = ?';
        const result = formatters.formatGetTimesByStopAndRouteQuery(testSub);
        expect(result).toEqual(expected);
      });

      it('formatGetStopsQuery', () => {
        const expected = 'SELECT * FROM `mta_stops`';
        const result = formatters.formatGetStopsQuery(testSub);
        expect(result).toEqual(expected);
      });

      it('formatGetStopQuery', () => {
        const expected = 'SELECT * FROM `mta_stops` WHERE `stop_id` = ?';
        const result = formatters.formatGetStopQuery(testSub);
        expect(result).toEqual(expected);
      });

      it('formatGetRoutesQuery', () => {
        const expected = 'SELECT * FROM `mta_routes`';
        const result = formatters.formatGetRoutesQuery(testSub);
        expect(result).toEqual(expected);
      });

      it('formatGetRouteQuery', () => {
        const expected = 'SELECT * FROM `mta_routes` WHERE `route_id` = ?';
        const result = formatters.formatGetRouteQuery(testSub);
        expect(result).toEqual(expected);
      });

      it('formatGetStopsByRouteQuery', () => {
        const expected = 'SELECT * FROM `mta_stop_routes` sr INNER JOIN `mta_stops` ON sr.stop_id WHERE route_id = ?';
        const result = formatters.formatGetStopsByRouteQuery(testSub);
        expect(result).toEqual(expected);
      });

      it('formatGetStopsByCoordsQuery', () => {
        const expected = 'SELECT * FROM `mta_stops` s RIGHT JOIN `mta_stop_routes` sr ON s.stop_id = sr.stop_id';
        const result = formatters.formatGetStopsByCoordsQuery(testSub);
        expect(result).toEqual(expected);
      });
    });
  });
});
