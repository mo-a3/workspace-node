var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customerRouter = require('./routes/api-customer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//database
const mongoose = require('mongoose');
	var dbName = 'nodejs';
	const url = 'mongodb://localhost:27017';
	const mongoUri = url + '/'+ dbName;
	mongoose.set();
	mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true,keepAlive: 1});
	mongoose.connection.on('error', () => {
	    throw new Error(`unable to connect to database: ${config.db}`);
	});



//api
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/customer',customerRouter );

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
  res.render('error');
});

module.exports = app;
  