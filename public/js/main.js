var g;
var hud;
require(['js/game'], function(game) {
  g = new Game();
});
require(['js/hud'], function(game) {
  hud = new HUD();
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
// var boat_idling = new Audio('audio/boat_idling.ogg');
var boat_revving = new Audio('audio/boat_revving.ogg');
boat_revving.preload = "auto";
var boat_halting = new Audio('audio/boat_halting.ogg');
boat_halting.preload = "auto";
var boat_starting = new Audio('audio/boat_starting.ogg');
boat_starting.preload = "auto";
var boat_kill = new Audio('audio/boat_kill.ogg');
boat_kill.preload = "auto";
var nature = new Audio('audio/nature.ogg');
nature.preload = "auto";
nature.loop = true;
var engine_status = "on";

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
  hud.init();

};

var add_event_listeners = function() {
  body.addEventListener("keydown", key_down, false);
  body.addEventListener("keyup", key_up, false);
  // body.addEventListener("keypress", key_press, false);

  body.addEventListener("mousedown", mouse_down, false);
  // body.addEventListener("mouseup", mouse_up, false);
  // body.addEventListener("mousemove", mouse_move, false);

};

var mouse_down = function(e) {
  console.log('debug: mouse_down');
  var x = hud.audio_toggle.x(hud.audio_toggle.img),
      y = hud.audio_toggle.y(hud.audio_toggle.img);
  console.log('debug: mouse_down, x = ' + x + ', y = ' + y );
  console.log('debug: audio width: ' + hud.audio_toggle.img.width);
  console.log('debug: mouse_down, screenX = ' + e.screenX + ', screenY = ' + e.screenY);
  if (e.clientX >= x &&
      e.clientX <= x + hud.audio_toggle.img.width &&
      e.clientY >= y &&
      e.clientY <= y + hud.audio_toggle.img.height) {
        console.log('debug: mouse_down, is within');
        if (engine_status == "off") {
          boat_starting.play();
          setTimeout(function() { audio_loop.start("boat_idling") }, 500);
          engine_status = "on";
        }
        else {
          boat_kill.play();
          audio_loop.stop("boat_idling");
          engine_status = "off";
        }
        // engine_status = !engine_status
  }
};

var is_within = function(img, x, y) {

};

var key_down = function(e) {
  if (engine_status !== "off") {
    switch(e.keyCode) {
      case 38:
        movement = "up";
        play_boat_moving_audio();
        break;
      case 40:
        movement = "down";
        play_boat_moving_audio();
        break;
      case 37:
        movement = "left";
        play_boat_moving_audio();
        break;
      case 39:
        movement = "right";
        play_boat_moving_audio();
        break;

    }

  }

};

var play_boat_moving_audio = function() {
  if (engine_status !== "moving") {
    console.log('debug: should only be here once');
    boat_revving.play();
    audio_loop.stop("boat_idling");
    setTimeout(function() { audio_loop.start("boat_moving") }, 600);
    // audio_loop.start("boat_moving");
    engine_status = "moving";
  }
};

var key_up = function(e) {
  switch(e.keyCode) {
    case 38:
    case 40:
    case 37:
    case 39:
      movement = "still";
      if (engine_status === "moving") {
        boat_halting.play();
        setTimeout(function() { audio_loop.stop("boat_moving") }, 120);
        setTimeout(function() { audio_loop.start("boat_idling") }, 1000);
        engine_status = "idling";
      }
      counter = 0;
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
  g.drawImage(hud.audio_toggle.img, hud.audio_toggle.x(hud.audio_toggle.img), hud.audio_toggle.y(hud.audio_toggle.img));
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
    audio_loop.addUri('audio/boat_idling.ogg', 780, "boat_idling");
    audio_loop.addUri('audio/boat_moving.ogg', 2030, "boat_moving");
    audio_loop.callback(sound_loaded("boat_idling"));
    console.log('debug: ' + path + ' loaded');

  })

};

var sound_loaded = function(uri) {
  audio_loop.start(uri);
  nature.play();
};

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

}

var start = function() {
  init();
  loop();

};

window.onload = start;

