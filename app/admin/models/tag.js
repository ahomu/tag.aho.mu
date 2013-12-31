var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  }
});

schema.methods = {
};

schema.pre('save', function(next) {
  this.updated_at = new Date();
  if (!this.created_at) {
    this.created_at = new Date();
  }
  next();
});

var Tag = mongoose.model('Tag', schema);

module.exports = Tag;