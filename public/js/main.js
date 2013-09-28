var worldly_objects = [];
var you;

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
	body = document.getElementsByTagName("body")[0];
	canvas = document.createElement("canvas");
	canvas.id = "canvas";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	context = canvas.getContext('2d');
	body.appendChild(canvas);

  horizon = (canvas.height / 2);
  center_axis = (canvas.width / 2);
};

var init_game = function() {
  define_you();
  define_world();
};

var define_you = function() {
};

var define_world = function() {
};

var loop = function() {
  requestAnimFrame(loop);
	context.clearRect(0, 0, canvas.width, canvas.height);
  render();
  draw();
};

var render = function() {
};

var draw() = function() {
};

var start = function() {
  init();
  loop();
};

window.onload = start;
