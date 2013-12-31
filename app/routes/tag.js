/**
 * Dependencies
 */

/**
 * Initialization
 */
var Tag = require('../models/tag');
var _ = require('lodash');

var tag = {
  /**
   * GET /tag
   */
  index: function *() {
    var tags = yield Tag.find().exec(),
        filter = _.partialRight(_.pick, 'name');

    this.type = 'application/json';
    this.body = JSON.stringify({items: _.map(tags, filter)});
  }
};

module.exports = tag;