var createError = require('http-errors');
var express = require('express');
var path = require('path');

// Adding Passport cookies/flash
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session')
//

var logger = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//enabling CORS
var cors = require('cors')
//

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// adding Flash for auth.
app.use(flash());
// CORS enabled
app.use(cors())
//

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

// Adding seesion/cookies
app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'woot',
  resave: false, 
  saveUninitialized: false}));


// authentication 'local' strategy via Passport.


module.exports = app;
