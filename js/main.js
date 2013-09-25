var init = function() {
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
