var game = require('../public/js/Game');

describe('Game', function() {
  it ('should return an object', function() {
    expect(typeof game).not.toBe('undefined');
  });
  it('should have name set as freddie', function() {
    var bar = new game();
    expect(bar.name).toEqual('freddie');
  });
});
