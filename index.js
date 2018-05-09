var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var url = require("url");


var port = process.env.PORT || 3000;

app.get('/', function(req, res, next){
  res.sendFile(__dirname + '/index.html');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.get('/pay10', function(request, res){
    var emitId = url.parse(request.url,true).query.emitId;
//     io.emit(emitId, "100");
//     console.log(emitId);
      io.emit('chat message', emitId);

    var redirect =  url.parse(request.url,true).query.redirect;
    res.writeHead(302, {
      'Location': redirect
      //add other headers here...
    });
    res.end();
});
io.set('transports', [ 'websocket' ]);
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
io.origins(['http://127.0.0.1:8080','https://wuchaolong.github.io/video/']);


http.listen(port, function(){
  console.log('listening on *:' + port);
});
