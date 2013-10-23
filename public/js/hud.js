var HUD = function() {
  var spacer = 32,
      audio_toggle_img = new Image(),
      audio_toggle_x,
      audio_toggle_y;

  this.init = function() {
    audio_toggle_img.onload = function() {
      this.audio_toggle_x = spacer;
      this.audio_toggle_y = (canvas.height - spacer) - this.height;
      console.log('debug: hud.js, canvas.height = ' + canvas.height);
      console.log('debug: hud.js, audio_toggle_x = ' + audio_toggle_x);
      console.log('debug: hud.js, this.width = ' + this.width);
      console.log('debug: hud.js, audio_toggle_y = ' + audio_toggle_y);
      console.log('debug: hud.js, this.height = ' + this.height);

    };
    audio_toggle_img.src = 'img/audio_toggle.png';
  };

  this.audio_toggle = {
    'on': function() {
      console.log('debug: HUD, audio_toggle, on');
    },
    'off': function() {
      console.log('debug: HUD, audio_toggle, off');
    },
    'img': audio_toggle_img,
    'x': function(img) {
      return spacer;
    },
    'y': function(img) {
      return (canvas.height - spacer) - img.height;
    },

  };

};

