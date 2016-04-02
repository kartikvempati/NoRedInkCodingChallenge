var express = require('express');
var cors = require('cors')
var app = express();
var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/../client'));
app.use(cors());


var server = app.listen(port);

module.exports = app;
