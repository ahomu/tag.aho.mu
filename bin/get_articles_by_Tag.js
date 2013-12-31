/**
 * Dependencies
 */
var mongoose = require('mongoose');
var co = require('co');
var _ = require('lodash');
var request = require('request');
var thunk = require('thunkify');
var zlib = require('zlib');

/**
 * Initialization
 */
var Tag  = require('../app/models/tag');
var Article  = require('../app/models/article');
var get = thunk(request);
var unzip = thunk(zlib.gunzip);
mongoose.connect('mongodb://127.0.0.1/koarecipe');

/**
 * @generator
 */
var getTags = co(function *() {
  var i = 0, tag, res, articles, decoded, queues = [],
      tags = yield Tag.find().exec();

  tags = _.pluck(tags, 'name');

  while (tag = tags[i++]) {

    console.log('loading tag `' + tag + '`.......')
    res = yield getArticles(tag);

    // clear old articles
    yield Article.find({related_tag: tag}).remove().exec();

    // quiita
    switch (res.quiita.statusCode) {
      case 200:
        articles = JSON.parse(res.quiita.body);
        queues.concat(_.map(articles, quiitaNormalizer(tag)));
        break;
      default:
        console.log(res.quiita.statusCode);
        break;
    }

    // stack overflow
    switch (res.stackoverflow.statusCode) {
      case 200:
        decoded  = yield unzip(res.stackoverflow.body);
        articles = JSON.parse(decoded.toString());
        queues.concat(_.map(articles.items, stackoverflowNormalizer(tag)));
        break;
      default:
        console.log(res.stackoverflow.statusCode);
        break;
    }
  }

  // waiting & exit
  console.log('waiting query execution complete...');
  yield queues;
  console.log('done!!');
  process.exit(0);
});

/**
 * for stackoverflow
 */
var stackoverflowNormalizer = function(tag) {
  return function(item) {
    return Article.create({
      title: item.title,
      url: item.link,
      reaction_count: item.answer_count,
      posted_at: item.creation_date * 1000, // convert ms timestamp
      provider: 'stackoverflow',
      related_tag: tag
    });
  };
};

/**
 * for quiita
 */
var quiitaNormalizer = function(tag) {
  return function(item) {
    return Article.create({
      title: item.title,
      url: item.url,
      reaction_count: item.comment_count,
      posted_at: item.created_at_as_seconds * 1000, // convert ms timestamp
      provider: 'quiita',
      related_tag: tag
    });
  };
};

/**
 * @see http://qiita.com/docs#10
 * @see https://api.stackexchange.com/docs/search
 * @return yieldable object
 */
var getArticles = function (tag) {
  return {
    quiita       : get('https://qiita.com/api/v1/tags/'+tag+'/items'),
    stackoverflow: get({
      url: 'https://api.stackexchange.com/2.1/search?order=desc&sort=activity&tagged='+tag+'&site=stackoverflow',
      encoding: null
    })
  };
};

// main
getTags();