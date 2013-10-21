var Game = function() {
  this.init = function() {
    console.log('debug: this is the init function for Game');
  };

  this.draw = function(blocks) {
    var sizes = [];
    for (var size in blocks) {
      sizes.push(size);
    }
    sizes.sort();
    sizes.reverse();
    for (var i = 0; i < sizes.length; i++) {
      var size = sizes[i];
      for (var row in blocks[size]) {
        for (var col in blocks[size][row]) {
          var pixel_size = blocks[size][row][col]['pixel_size'] || window.pixel_size;
          var x = blocks[size][row][col]['col'] * pixel_size;
          var y = blocks[size][row][col]['row'] * pixel_size;
          var r = blocks[size][row][col]['r'],
              g = blocks[size][row][col]['g'],
              b = blocks[size][row][col]['b'];
          context.fillStyle = rgbToHex(r, g, b);
          context.fillRect(x, y, pixel_size, pixel_size);
        }

      }

    }

  };
};
// module.exports = Game;
