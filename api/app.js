var createError = require('http-errors');
var express = require('express');
var path = require('path');

//add passport cookies/flash
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session')
//
var logger = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser');

//add routes files
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var reviewsRouter = require('./routes/reviews');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Added this to fetch build from client:

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'))
}


app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true })); ///changed from false 
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//add flash for auth
app.use(flash());

// Adding seesion/cookies
app.use(session({ cookie: { name: "cookie" }, 
  secret: 'woot',
  resave: false, 
  saveUninitialized: false})
);
// require passport/sessions
var passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())

// Routes setup
app.use('/', indexRouter);
app.use('/users', usersRouter(passport));
app.use('/reviews', reviewsRouter);
//

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
