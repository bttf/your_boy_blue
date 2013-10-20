var pixel_size = 32;
var blocks = {};
var boat = {};
var boat_x = 0,
    boat_y = 0;
var speed = 5;
var movement = "still";
var counter = 0;

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
  init_game();

};

var init_browser = function() {
  // console.log('debug: init_browser called');
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

var init_game = function() {
  load_map('js/map1.json');
  load_boat('js/boat.json');

};

var add_event_listeners = function() {
  body.addEventListener("keydown", key_down, false);
  body.addEventListener("keyup", key_up, false);
  // body.addEventListener("keypress", key_press, false);

  // body.addEventListener("mousedown", mouse_down, false);
  // body.addEventListener("mouseup", mouse_up, false);
  // body.addEventListener("mousemove", mouse_move, false);

};

var key_down = function(e) {
  switch(e.keyCode) {
    case 38:
      movement = "up";
      break;
    case 40:
      movement = "down";
      break;
    case 37:
      movement = "left";
      break;
    case 39:
      movement = "right";
      break;

  }
  // console.log('debug: movement = ' + movement);

};

var key_up = function(e) {
  switch(e.keyCode) {
    case 38:
    case 40:
    case 37:
    case 39:
      movement = "still";
      break;

  }
  // console.log('debug: keyup, movement = ' + movement);

};

var loop = function() {
  requestAnimFrame(loop);
	context.clearRect(0, 0, canvas.width, canvas.height);
  if (counter % 10 == 0) {
    switch (movement) {
      case "up":
        boat_y -= pixel_size;
        break;
      case "down":
        boat_y += pixel_size;
        break;
      case "left":
        boat_x -= pixel_size;
        break;
      case "right":
        boat_x += pixel_size;
        break;

    }
    counter = 0;

  }
  draw();
  counter++;

};

var draw = function() {
  // console.log('debug: entering draw');
  draw_map(); // draw_blocks();
  draw_boat();

};

var draw_map = function() {
  // console.log('debug: entering draw_map');
  // console.log('debug: blocks: ' + blocks);
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

var draw_boat = function() {
  var sizes = [];
  for (var size in boat) {
    sizes.push(size);
  }
  sizes.sort();
  sizes.reverse();
  for (var i = 0; i < sizes.length; i++) {
    var size = sizes[i];
    for (var row in boat[size]) {
      for (var col in boat[size][row]) {
        var pixel_size = boat[size][row][col]['pixel_size'] || window.pixel_size;
        var x = boat[size][row][col]['col'] * pixel_size;
        var y = boat[size][row][col]['row'] * pixel_size;
        var r = boat[size][row][col]['r'],
            g = boat[size][row][col]['g'],
            b = boat[size][row][col]['b'];
        context.fillStyle = rgbToHex(r, g, b);
        context.fillRect(x + boat_x, y + boat_y, pixel_size, pixel_size);
      }

    }

  }
};

var load_map = function(path) {
  $.getJSON(path, function(response) {
    blocks = JSON.parse(response);
    console.log('debug: ' + path + ' loaded');

  })

};

var load_boat = function(path) {
  $.getJSON(path, function(response) {
    boat = JSON.parse(response);
    console.log('debug: ' + path + ' loaded');

  })

};

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

}

var start = function() {
  init();
  loop();

};

window.onload = start;

