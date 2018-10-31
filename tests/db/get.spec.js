const get = require('../../db/get');

describe('db get', () => {
  describe('formatters', () => {
    const { formatters } = get;

    it('formatTableName', () => {
      const sub = 'test';
      const tableType = 'example_table';
      const expected = `${sub}_${tableType}`;
      expect(formatters.formatTableName(sub, tableType)).toEqual(expected);
    });
  });
});
