/**
 * Dependencies
 */

/**
 * Initialization
 */
var Tag = require('../models/tag');
var _ = require('lodash');

/**
 * Definition
 */
var tag = {
  /**
   * GET /tag
   */
  index: function *() {
    var tags = yield Tag.find().exec();
    this.type = 'application/json';
    this.body = JSON.stringify({items: tags});
  },

  /**
   * POST /tag
   */
  create: function *() {
    try {
      var createdTag = yield Tag.create({name: this.params.name});
      this.status = 200;
      this.body = JSON.stringify({result: 'success', tag: createdTag.toObject()});
    } catch(e) {
      switch (e.code) {
        case 11000:
          this.status = 400;
          this.body = JSON.stringify({result: 'error', reason: 'duplicate'});
          break;
        default:
          this.status = 500;
          this.body = JSON.stringify({result: 'error'});
          break;
      }
    }
  },

  /**
   * PUT /tag
   */
  update: function *() {
    // not implmented
  },

  /**
   * DELETE /tag/:name
   */
  delete: function *(name) {
    try {
      yield Tag.findOne({name: name}).remove().exec();
      this.status = 200;
      this.body = JSON.stringify({result: 'success'});
    } catch(e) {
      this.status = 500;
      this.body = JSON.stringify({result: 'error'});
    }
  }
};

module.exports = tag;