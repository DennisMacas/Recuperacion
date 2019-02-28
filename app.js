var express = require('express');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
var flash = require('express-flash-notification');

const passport = require('passport');

var session = require('express-session');

var app = express();

//Setting
const db = require('./database');

//const AuthController = require('./controllers/auth.controller');
//passport.use(new Strategy({ usernameField: 'email' }, AuthController.getSession));

const flashOptions = {
  beforeSingleRender: function(item, callback){
    if (item.type) {
      switch(item.type) {
        case 'GOOD':
          item.type = 'Hecho';
          item.alertClass = 'alert-success';
          break;
        case 'OK':
          item.type = 'Info';
          item.alertClass = 'alert-info';
          break;
        case 'BAD':
          item.type = 'Error';
          item.alertClass = 'alert-danger';
          break;
      }
    }
    callback(null, item);
  }
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Middlewares
app.use(logger('dev'));
app.use(express.json());

app.use(session({
  name: 'example',
  secret: 'shuush',
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    expires: 86400000
  },
}));

app.use(flash(app, flashOptions));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


//Routes
app.use('/api/factura', require('./routes/factura.routes'));
app.use('/api/SW', require('./routes/sw.routes')); 
app.use('/', require('./routes/index.routes'));

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
