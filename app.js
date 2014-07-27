
/**
 * Module dependencies.
 */

var express = require('express');
var session = require('express-session');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose').connect('mongodb://localhost/test');

var app = express();


// Setup session
app.use(express.cookieParser());
app.use(express.session({
  cookie: {
    path    : '/',
    httpOnly: false,
    maxAge  : 24*60*60*1000
  },
  secret: '1234567890QWERT',
  store: new express.session.MemoryStore
}));


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


// Schema for fruits
var fruitSchema = mongoose.Schema({
  name: String,
  image: String
});

var Fruit = mongoose.model('Fruit', fruitSchema);


app.get('/', routes.index);
app.get('/users', user.list);

app.get('/search', function (req, res) {

  // Return all of them!
  Fruit.find({}, function (err, fruits) {
    if (err) return console.error(err);

    // Send the fruits to the client!
    res.send(fruits);
  });
});

app.put('/create', function (req, res) {

  // Only create if user logged in
  if (checkAuth(req)) {
    var newFruit = new Fruit({ name: req.body.name.toLowerCase(), image: req.body.image });

    newFruit.save(function (err) {
      if (err) return console.error(err);
    });

    res.send("success");
  } else {
    res.send("fail");
  }
});

app.get('/check_login', function (req, res) {

  if (checkAuth(req)) {
    res.send("success");
  } else {
    res.send("fail");
  }
})

// Check if a user is authenticated with a user_id
function checkAuth(req) {
  if (!req.session.user_id) {
    return false;
  } else {
    return true;
  }
};

app.post('/login', function (req, res) {
  var user = req.body;

  if (user.name === "joe" && user.password === "123456") {
    // User is now authenticated
    req.session.user_id = 123; // placeholder, this will be database ID in future

    res.send("success");
  } else {
    res.send("fail");
  }
});

app.get('/logout', function (req, res) {
  // Kill the users session
  delete req.session.user_id;

  res.send("Done");
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
