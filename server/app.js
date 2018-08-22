var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var mongoose = require('mongoose');


var MONGO_URI = `mongodb://mario:mario123@ds229312.mlab.com:29312/myblog`
var test = `mongodb://mario:mario123@ds125602.mlab.com:25602/blog-testing`

if(process.env.NODE_ENV == 'test'){
   MONGO_URI = test
}
mongoose.connect(MONGO_URI,{ useNewUrlParser: true },function(err){
  if(err){
    console.log(err);
    
  }else{
    console.log("connected");
    
  }
})



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/article')

var app = express();
app.use(require('cors')())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/article',articleRouter);

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
