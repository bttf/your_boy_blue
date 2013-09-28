var http = require('http');
var fs = require('fs');

var index;
fs.readFile('/home/vagrant/your_boy_blue/index.html', 'utf-8', function(err, data) {
  if (err) {
    return console.log(err);
  }
  index = data;
});

http.createServer(function (req, res) {
  var buffer = new Buffer(index, "utf-8");
  res.writeHead(200);
  res.end(buffer.toString('utf-8'));
}).listen(8000, '0.0.0.0');

console.log('we up and running sir');
