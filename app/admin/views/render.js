/**
 * Dependencies
 */
var views = require('co-views');

// setup views mapping .html
module.exports = views(__dirname + '/', {
  ext: 'jade',
  map: {
    jade: 'jade'
  }
});