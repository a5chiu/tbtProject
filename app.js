'use strict'
//getting express package
var express = require('express');
var path = require('path');
var reload = require('reload');

//calling it into app
var app = express();

//sends html file
app.get('/', function(req, res) {
    res.status(200).sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res) {
    console.log("PRINT");
});

//loads static files (css and javascript: exclusing main js)
app.use('/public', express.static(path.join(__dirname, 'public')));

//connects to the server of port 8080
var server = app.listen(process.env.PORT || 8080, function(req, res) {
    console.log("App listening on Port %s", server.address().port);
    console.log("test");
});

reload(app);