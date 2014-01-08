/**
 * Dependencies
 */
var koa     = require('koa');
var r       = require('koa-route');
var favicon = require('koa-favicon');
var serve   = require('koa-static');
var logger  = require('koa-logger');
var session = require('koa-session');
var mount   = require('koa-mount');

/**
 * Initialization
 */
var app      = koa();
var admin    = require('./admin');
var render   = require('./views/render');
var parser   = require('./lib/middlewares/body-parser');
var articleR = require('./routes/article');
var tagR     = require('./routes/tag');

app.keys = [process.env.SECRET];
app.adminPath = '/admin';

/**
 * Middlewares
 */
app.use(logger());
app.use(session());
app.use(serve(__dirname + '/../public'));
app.use(favicon());
app.use(parser());
app.use(mount(app.adminPath, admin));
if (process.env.NODE_ENV === 'development') {
  app.use(require('koa-livereload')());
}

/**
 * Routings
 */
app.use(r.get('/', function *() {
  this.body = yield render('index');
}));
app.use(r.get('/tag', tagR.index));
app.use(r.get('/article', articleR.index));

module.exports = app;