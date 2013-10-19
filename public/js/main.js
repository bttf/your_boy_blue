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
	body.appendChild(canvas);

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
  var speed = pixel_size;

  if (e.keyCode == 61) {
    pixel_size++;
  }
  if (e.keyCode == 173) {
    pixel_size--;
  }
  if (e.keyCode == 38) {
    offset_y -= speed;
  }
  if (e.keyCode == 40) {
    offset_y += speed;
  }
  if (e.keyCode == 39) {
    offset_x += speed;
  }
  if (e.keyCode == 37) {
    offset_x -= speed;
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

  var block = {
    "col": column,
    "row": row,
    "r": r,
    "g": g,
    "b": b,
    "a": a,
  };

  if (blocks[row] == null) {
    blocks[row] = {};
  }

  blocks[row][column] = block;

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
  for (var row in blocks) {
    for (var col in blocks[row]) {
      var x = blocks[row][col]['col'] * pixel_size;
      var y = blocks[row][col]['row'] * pixel_size;
      var r = blocks[row][col]['r'],
          g = blocks[row][col]['g'],
          b = blocks[row][col]['b'];

      context.fillStyle = rgbToHex(r, g, b);
      context.fillRect(x + offset_x, y + offset_y, pixel_size, pixel_size);

    }

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

window.onload = start;

