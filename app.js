var path = require('path');
var express = require('express');
var app = express();
var http = require('http');

app.use(express.static(path.join(__dirname, 'public')));

app.set('port', 3000);
var server = http.createServer(app);
server.listen(3000);

console.log('Example app listening at http://%s:%s', 'localhost', 3000);

require('./webpackServer')