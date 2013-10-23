var Game = function() {
  this.draw = function(blocks, offset_x, offset_y) {
    offset_x = typeof offset_x !== 'undefined' ? offset_x : 0;
    offset_y = typeof offset_y !== 'undefined' ? offset_y : 0;
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
          context.fillRect(x + offset_x, y + offset_y, pixel_size, pixel_size);
        }

      }

    }

  };

  this.drawImage = function(img, x, y) {
      context.drawImage(img, x, y);

  };

};
// module.exports = Game;
