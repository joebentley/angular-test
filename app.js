
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/search', function (req, res) {
  res.send([
    { name: 'pear', image: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Alexander_Lucas_10.10.10.jpg'},
    { name: 'apple', image: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg'},
    { name: 'orange', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Orange_and_cross_section.jpg'}
    ]);
});


http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
