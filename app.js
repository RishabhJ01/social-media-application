require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
var session = require('express-session');
var passport = require('passport');
var ejs = require('ejs');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var postRouter = require("./routes/post");
var profileRouter = require('./routes/profile');
const { default: mongoose } = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
mongoose.set('strictQuery', true);

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());

app.use(passport.session());

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}, (err) => {
  if(err) throw err;
  console.log("database connected");
})

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', postRouter);
app.use('/', profileRouter);

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
