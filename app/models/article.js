var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  reaction_count: {
    type: Number,
    required: true
  },
  posted_at: {
    type: Date,
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  related_tag: {
    type: String,
    required: true
  }
});

schema.methods = {
};

var Article = mongoose.model('Article', schema);

module.exports = Article;