/**
 * Dependencies
 */
var koa = require('koa');
var r   = require('koa-route');

/**
 * Initialization
 */
var admin  = koa();
var render = require('./views/render');
var User   = require('./models/user');

var loginR = require('./routes/login');
var userR  = require('./routes/user');
var tagR   = require('./routes/tag');

/**
 * Middlewares
 */
admin.use(function *(next) {
  var loginUser = yield User.findById(this.session.user_id).exec();

  this.authorized = loginUser;
  if (!this.authorized && this.request.path !== '/login') {
    switch (this.request.method) {
      case 'GET':
        this.redirect(this.app.adminPath + '/login');
        break;
      case 'POST':
      case 'PUT':
      case 'DELETE':
        this.status = 403;
        return;
    }
  }
  yield next;
});

/**
 * Routings
 */
admin.use(r.get('/', function *() {
  this.body = yield render('index')
}));
admin.use(r.get('/login', loginR.index));
admin.use(r.post('/login', loginR.update));

admin.use(r.get('/tag', tagR.index));
admin.use(r.post('/tag', tagR.create));
admin.use(r.put('/tag', tagR.update));
admin.use(r.delete('/tag/:name', tagR.delete));

admin.use(r.get('/user/register', userR.register));
admin.use(r.post('/user/create', loginR.create));

module.exports = admin;