var express = require('express');
var path = require('path');

var index = require('./routes/index');
var sharkslist = require('./routes/sharkslist');
var catslist = require('./routes/catslist');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../pnf-client/build/'));
app.set('view engine', 'jade');

app.use('/static', express.static(path.join(__dirname, '../pnf-client/build/static/')));

app.use('/', index);
app.use('/catslist', catslist);
app.use('/sharkslist', sharkslist);


// TODO: remove this after development is done.
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.send('404 Not Found');
});

module.exports = app;