var game = require('../public/js/Game');

describe('Game', function() {
  describe('Game.init', function() {
    it ('should have an init function', function() {
      var bar = new game();
      expect(typeof bar.init).toBe('function');
    });

  });
});
