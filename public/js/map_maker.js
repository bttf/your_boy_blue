var pixel_size = 32;
var blocks = {};
var mouse_x = null;
var mouse_y = null;
var offset_x = 0;
var offset_y = 0;
var r = 64,
    g = 64,
    b = 244,
    a = 255;

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);

          };

})();

var init = function() {
  init_browser();

};

var init_browser = function() {
	body = document.getElementsByTagName("body")[0];
	canvas = document.createElement("canvas");
	canvas.id = "canvas";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight - 5;
	context = canvas.getContext('2d');
  color_input = document.createElement('input');
  color_input.value = rgbToHex(r, g, b);
  color_input.className = "color_input";
	body.appendChild(canvas);
  body.appendChild(color_input);
  add_event_listeners();
  horizon = (canvas.height / 2);
  center_axis = (canvas.width / 2);
  context.font = "16px Arial";

};

var add_event_listeners = function() {
  body.addEventListener("keydown", key_down, false);
  body.addEventListener("mousedown", mouse_down, false);
  body.addEventListener("mouseup", mouse_up, false);
  body.addEventListener("mousemove", mouse_move, false);

};

var key_down = function(e) {
  switch (e.keyCode) {
    case 61:
    case 187:
      pixel_size++;
      break;
    case 173:
    case 189:
      pixel_size--;
      break;

  }

};

var mouse_down = function(e) {
  mouse_x = e.pageX;
  mouse_y = e.pageY;
  add_block(mouse_x, mouse_y);

};

var mouse_up = function(e) {
  mouse_x = null;
  mouse_y = null;

};

var mouse_move = function(e) {
  if (mouse_x && mouse_y) {
    mouse_x = e.pageX;
    mouse_y = e.pageY;
    add_block(mouse_x, mouse_y);

  }

};

var add_block = function(x, y) {
  var row    = ((y - offset_y)  / pixel_size) | 0,
      column = ((x - offset_x) / pixel_size) | 0;
  var color = hexToRgb(color_input.value) || { 'r': r, 'g': g, 'b': b };
  var block = {
    'pixel_size': pixel_size,
    'col': column,
    'row': row,
    'r': color.r,
    'g': color.g,
    'b': color.b,
    'a': color.a,
  };
  if (blocks[pixel_size] == null) {
    blocks[pixel_size] = {};
  }
  if (blocks[pixel_size][row] == null) {
    blocks[pixel_size][row] = {};
  }
  blocks[pixel_size][row][column] = block;

};

var loop = function() {
  requestAnimFrame(loop);
	context.clearRect(0, 0, canvas.width, canvas.height);
  render();
  draw();

};

var render = function() {
};

var draw = function() {
  draw_grid();
  draw_blocks();

  context.fillText("pixel size: " + pixel_size, 10, 20);

  if (mouse_x && mouse_y) {
    context.fillText("mouse coords: " + mouse_x + ", " + mouse_y, 10, 40);
  }

};

var draw_grid = function() {
  context.lineWidth = 0.1;

  for (var i=0; i < canvas.height; i += pixel_size) {
    var x = 0,
      y = i;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(canvas.width, y);
    context.stroke();

  }

  for (var i=0; i < canvas.width; i += pixel_size) {
    var x = i,
      y = 0;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, canvas.height);
    context.stroke();

  }

};

var draw_blocks = function() {
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
  for (var size in sizes) {

  }

};

var setPixel = function(imageData, x, y, r, g, b, a) {
  var index = (x + y * imageData.width) * 4;

  imageData.data[ index + 0 ] = r;
  imageData.data[ index + 1 ] = g;
  imageData.data[ index + 2 ] = b;
  imageData.data[ index + 3 ] = a;

};

var start = function() {
  init();
  loop();

};

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
}

window.onload = start;

