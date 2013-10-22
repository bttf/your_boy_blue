var g;
require(['js/game'], function(game) {
  g = new Game();
});

var audio_loop = new SeamlessLoop();

var pixel_size = 32;
var blocks = {};
var boat = {};
var boat_x = 0,
    boat_y = 0;
var speed = 5;
var movement = "still";
var counter = 0;
var boat_idling = new Audio('audio/boat_idling.ogg');

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
  boat_idling.loop = true;

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

};

var loop = function() {
  requestAnimFrame(loop);
	context.clearRect(0, 0, canvas.width, canvas.height);
  render();
  draw();
  counter++;

};

var render = function() {
  if (counter % 20 == 0) {
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

};

var draw = function() {
  g.draw(blocks);
  g.draw(boat, boat_x, boat_y);

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
    audio_loop.addUri('audio/boat_idling.ogg', 230, "boat_idling");
    audio_loop.callback(sound_loaded("boat_idling"));
    console.log('debug: ' + path + ' loaded');

  })

};

var sound_loaded = function(uri) {
  audio_loop.start(uri);
};

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

}

var start = function() {
  init();
  loop();

};

window.onload = start;

