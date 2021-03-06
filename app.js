var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apikey = require('./config/mapbox.json');

var app = express();

var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('pages/index');
});

app.use('/users', usersRouter);

app.get('/about', (req, res) => {
   res.render('pages/about');
});

app.get('/demo', (req, res) => {
    res.render('pages/demo');
});

app.get('/mapSearch', (req, res) => {
  res.render('pages/mapSearch', {key: apikey.key});
});

app.get('/map', (req, res) => {
    res.render('pages/map', {key: apikey.key});
});

app.post('/map', (req, res) => {
    var from = JSON.parse(req.body.from);
    res.locals.from = from;
    if (req.body.to) {
      var to = JSON.parse(req.body.to);
      res.locals.to = to;
    }
    res.render('pages/map', {key: apikey.key});
});

app.post('/showformdata', (req, res) => {
  res.json(req.body);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error');
});

module.exports = app;
