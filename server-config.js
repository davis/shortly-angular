var express = require('express');
var partials = require('express-partials');
var util = require('./lib/utility');

var handler = require('./lib/request-handler');

var app = express();

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(partials());
  app.use(express.bodyParser());
  app.use('/bower_components', express.static(__dirname + '/bower_components')); // for angular stuff
  app.use('/client', express.static(__dirname + '/client'));
  app.use(express.static(__dirname));
  app.use(express.cookieParser('shhhh, very secret'));
  app.use(express.session());
});

app.get('/', handler.renderIndex);
app.get('/shorten', handler.renderIndex);

app.get('/links', handler.fetchLinks);
app.post('/links', handler.saveLink);

app.get('/login', handler.loginUserForm);
app.post('/login', handler.loginUser);
app.get('/logout', handler.logoutUser);

// ===== dev stage test =====
app.get('/findusers', handler.findUsers);

app.get('/signup', handler.signupUserForm);
app.post('/signup', handler.signupUser);

app.get('/*', handler.navToLink);

module.exports = app;
