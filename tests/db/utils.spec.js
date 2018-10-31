const utils = require('../../db/utils');

describe('utils', () => {
  it('formatTableName', () => {
    const sub = 'test';
    const tableType = 'example_table';
    const expected = `${sub}_${tableType}`;
    expect(utils.formatTableName({ sub, tableType })).toEqual(expected);
  });
});
