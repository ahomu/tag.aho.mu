/**
 * Dependencies
 */

/**
 * Initialization
 */
var Article = require('../models/article');
var _ = require('lodash');

var article = {
  /**
   * GET /article
   */
  index: function *() {
    var articles = yield Article.find({related_tag: this.query.tag}).exec(),
        filter = _.partialRight(_.pick, 'title', 'url', 'provider', 'reaction_count');

    this.type = 'application/json';
    this.body = JSON.stringify({items: _.map(articles, filter)});
  }
};

module.exports = article;
