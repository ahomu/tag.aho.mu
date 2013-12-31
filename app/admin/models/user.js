var mongoose = require('mongoose');
var crypto = require('crypto');

var schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String
  },
  hashed_password: {
    type: String
  },
  salt: {
    type: String
  },
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  }
});

schema.virtual('password').set(function(password) {
  this._password = password;
  this.salt = this.makeSalt();
  this.hashed_password = this.encryptPassword(password);
}).get(function() {
  return this._password;
});

schema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },
  encryptPassword: function(password) {
    if (!password || !this.salt) {
      return '';
    }
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

schema.pre('save', function(next) {
  this.updated_at = new Date();
  if (!this.created_at) {
    this.created_at = new Date();
  }
  next();
});

var User = mongoose.model('User', schema);
User.schema.path('role').validate(function (value) {
  return /admin|member/i.test(value);
}, 'Invalid role');

module.exports = User;