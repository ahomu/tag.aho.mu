/**
 * Dependencies
 */
var parse = require('co-body');

var bodyParser = function() {
  return function *(next){
    if ('POST' !== this.method) {
      return yield next;
    }
    this.params = yield parse(this, {
      limit: '1kb'
    });
    yield next;
  }
};

module.exports = bodyParser;