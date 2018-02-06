const staticParser = require('../../../parsers/mta/static');

describe('mta static parser', () => {
  it('should correctly parse routes.txt', () => {
    expect.assertions(1);
    let expected = [
      ['1', 'Train desc example 1'],
      ['2', 'Train desc example 2'],
      ['A', 'Train desc example 3']
    ];
    // Test sample data first
    return expect(staticParser._getRoutes(__dirname))
      .resolves.toEqual(expected);
  });

  it('should correctly parse stops.txt', () => {
    expect.assertions(1);
    let expected = [
      ['101', 'Van Cortlandt Park - 242 St', '40.889248','-73.898583'],
      ['101N', 'Van Cortlandt Park - 242 St', '40.889248', '-73.898583'],
      ['101S', 'Van Cortlandt Park - 242 St', '40.889248', '-73.898583']
    ];
    return expect(staticParser._getStops(__dirname))
      .resolves.toEqual(expected);
  });

  it('should correctly parse stop_times.txt', () => {
    expect.assertions(1);
    let expected = [
      ['Q', 'WKD', '20:33:30', 'D27S'],
      ['Q', 'WKD', '20:35:00', 'D28S'],
      ['Q', 'WKD', '20:36:30', 'D29S']
    ];
    return expect(staticParser._getStopTimes(__dirname))
      .resolves.toEqual(expected);
  });

  it('should correctly parse everything', () => {
    expect.assertions(1);
    let expected = {
      routes: [
        ['1', 'Train desc example 1'],
        ['2', 'Train desc example 2'],
        ['A', 'Train desc example 3']
      ],
      stops: [
        ['101', 'Van Cortlandt Park - 242 St', '40.889248','-73.898583'],
        ['101N', 'Van Cortlandt Park - 242 St', '40.889248', '-73.898583'],
        ['101S', 'Van Cortlandt Park - 242 St', '40.889248', '-73.898583']
      ],
      stoptimes: [
        ['Q', 'WKD', '20:33:30', 'D27S'],
        ['Q', 'WKD', '20:35:00', 'D28S'],
        ['Q', 'WKD', '20:36:30', 'D29S']
      ]
    };
    return expect(staticParser.getAll(__dirname))
      .resolves.toEqual(expected);
  });

});