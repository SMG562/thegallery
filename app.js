var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var main = require('./routes/main');
var users = require('./routes/users');
var hbs = require('hbs');
var debugLog = require('debug-log')('foo');


//express 实例化
var app = express();

//数据库 mysql
var mysql = require("mysql");

// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "45.32.103.71",
  user: "liuhan213",
  password: "Superhard213!",
  database: "thegallery"

});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//模板文件的路径
hbs.registerPartials(__dirname + '/views/partials');

// app.get('/', function(req, res,next){
//     res.render('home.hbs');
// });

// app.get('/celebrity', function(req,res,next){
//     res.render('celebrity.hbs');
// });

// app.get('/brand', function(req,res,next){
//     res.render('brand.hbs');
// });

// app.get('/OneCelebrity', function(req,res,next){
//     res.render('OneCelebrity.hbs');
// });

// app.get('/OneBrand', function(req,res,next){
//     res.render('onebrand.hbs');
// });

//对所有名人页的访问，返回
// app.get('/celeS/*', function(req,res,next){
//   console.log('paragrams is '+ req.params.key);
//     res.send('This is page.'+ req.params.key);
// });


// app.get('/celebrity/:id', function(req,res){
//     // res.send('This is celebrity.'+ req.params.id);
//        res.render('oneCelebrity.hbs');
// });


// app.get('/brand/:id', function(req,res){
//     // res.send('This is brand.'+ req.params.id);
//     res.render('onebrand.hbs');
// });


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(favicon(__dirname + '/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/', routes);
app.use('/users', users);
app.use('/', main);
// 访问public 目录下的静态文件，如 http://localhost:3000/images/kitten.jpg
app.use(express.static('public')) 

// catch 404 and forward to error handler
// 此中间件没有路径，即对所有路径都要执行。当用户输入的路径与上述路径都不匹配时，即触发此中间件，404错误被捕获。然后传递给下一个中间件。
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err); //err是一个参数
});


// error handlers
// development error handler
// will print stacktrace 
//处理404错误的中间件，多了一个err 参数
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
