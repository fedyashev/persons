var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
//var autoIncrement = require("mongodb-autoincrement");
var autoincrement = require("mongoose-auto-increment");

var credentials = require("./credentials");


//mongoose.plugin(autoIncrement.mongoosePlugin, {field: "id"});
mongoose.connect(credentials.mlab.connectionString);
autoincrement.initialize(mongoose.connection);

//var index = require('./routes/index');
//var users = require('./routes/users');
var persons = require("./routes/persons");

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
app.use(favicon(path.join('../client', 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join('../client', 'public')));

//app.use('/', index);
//app.use('/users', users);
app.use("/api/persons", persons);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
