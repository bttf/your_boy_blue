var pixel_size = 32;
var blocks = {};

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

var add_event_listeners = function() {
  // body.addEventListener("keydown", key_down, false);
  // body.addEventListener("mousedown", mouse_down, false);
  // body.addEventListener("mouseup", mouse_up, false);
  // body.addEventListener("mousemove", mouse_move, false);

};

var loop = function() {
  requestAnimFrame(loop);
	context.clearRect(0, 0, canvas.width, canvas.height);
  render();
  draw();

};

var render = function() {
  // console.log('debug: entering render');
};

var draw = function() {
  // console.log('debug: entering draw');
  draw_map(); // draw_blocks();

};

var draw_map = function() {
  // console.log('debug: entering draw_map');
  // console.log('debug: blocks: ' + blocks);
  for (var row in blocks) {
    for (var col in blocks[row]) {
      // console.log('debug: x y z r g b about to get set ...');
      var x = blocks[row][col]['col'] * pixel_size;
      var y = blocks[row][col]['row'] * pixel_size;
      var r = blocks[row][col]['r'],
          g = blocks[row][col]['g'],
          b = blocks[row][col]['b'];

      // console.log('debug: fillStyle and fillRect about to happen ...');
      context.fillStyle = rgbToHex(r, g, b);
      context.fillRect(x, y, pixel_size, pixel_size);

    }

  }

};

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

}

var start = function() {
  init();
  loop();

  $.getJSON('js/map1.json', function(response) {
    blocks = JSON.parse(response);
    console.log('debug: map loaded');
  })

};

window.onload = start;

