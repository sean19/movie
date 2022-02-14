#!/usr/bin/env node

import { App } from "./com/sean/App";
import { HttpMgr } from "./com/sean/httpservice/HttpMgr";
import { Express, Request, Response, NextFunction } from "express-serve-static-core";
import {RouteMgr} from "./com/sean/routes/RouteMgr";

/**
 * Module dependencies.
 */

var path = require('path');
var pathconfig:string = path.join(__dirname, '..','config.json');
var config = require(pathconfig);

// var debug = require('debug')('fish:server');
var http = require('http');
var express = require('express');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

App.init(config);



var app: Express = express();

var secret: string = "metro-o";
app.use(cookieParser(secret));
//====================================

//====================================
app.set("trust proxy", 1);
app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: true,
  // store: new RedisStore(redisConfig),
  cookie: {
    secure: false,
    maxAge: 9000000
  }
}));
var httpMgr: HttpMgr = new HttpMgr();
httpMgr.init(app);

// var redisConfig = {
//   client: RedisMgr.instance.client,
//   prefix: 'session'
// };

// view engine setup
app.set('views', path.join(__dirname,"..", 'views'));
app.set('view engine', 'ejs');

var faviconstr:string = path.join(__dirname,"..", 'public','favicon.ico');

app.use(favicon(faviconstr));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var secret: string = "25qp";
app.use(cookieParser(secret));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: true,
  //store: new RedisStore(redisConfig),
  cookie: {
    secure: false,
    maxAge: 9000000
  }
}));

var publicpath:string = path.join(__dirname,'..', 'public');
app.use(express.static(publicpath));

RouteMgr.instance.use(app);

// catch 404 and forward to error handler
app.use((err1: any, req: Request, res: Response, next: NextFunction): any => {
  var err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction): any => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/**
 * Get port from environment and store in Express.
 */
var portwww = config.portwww;
var port = normalizePort(process.env.PORT || portwww);

app.set('port', port);
console.log("http的----------------------------------------------端口:"+portwww);
/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
// server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

// function onListening() {
//   var addr = server.address();
//   var bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//   debug('Listening on ' + bind);
// }

