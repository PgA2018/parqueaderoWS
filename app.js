//archivo de propiedades
require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors= require("cors")

var routesApi= require('./app_api/routes/index');
var routesSeguridadApi= require('./app_seguridad_api/routes/index');


var app = express();
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cors({}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/general', routesApi);
app.use('/seguridad', routesSeguridadApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('No encontrada');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        if(err.name==="UnauthorizedError"){
          res.status(401);
          res.json({"message": err.name+":"+err.message });
        }
        else{
          console.log(err);
          res.status(err.status || 500);
          res.json('error', {
              message: err.message,
              error: err
          });
        }
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.json({"mensaje":"not found"});
});

console.log("servidor-------------------------------------------------");

module.exports = app;
