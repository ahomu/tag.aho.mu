/**
 * Dependencies
 */

/**
 * Initialization
 */
var render = require('../views/render');
var User = require('../models/user');
var _ = require('lodash');

/**
 * Definition
 */
var login = {
  /**
   * GET /login
   */
  index: function *() {
    if (!!this.authorized) {
      this.redirect(this.app.adminPath);
      return;
    }
    this.body = yield render('login');
  },
  /**
   * POST /login
   */
  update: function *() {
    var loginUser = yield User.findOne({
      email: this.params.email,
      role: 'admin'
    }).exec();

    if (!!loginUser && loginUser.authenticate(this.params.password)) {
      this.session.user_id = loginUser._id;
      this.redirect(this.app.adminPath);
    } else {
      this.body = yield render('login', _.extend({
        message: 'Error'
      }, this.params));
    }
  }
};

module.exports = login;