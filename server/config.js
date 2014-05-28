var morgan     = require('morgan'),
    bodyParser = require('body-parser'),
    middle     = require('./middleware'),
    Heap       = require('heap');

module.exports = exports = function(app, express, routers) {
  app.set('port', process.env.PORT || 9000);
  app.set('base url', process.env.URL || 'http://localhost');
  app.set('love', new Heap(function(a, b) {
    return b.score - a.score;
  }));
  app.set('hate', new Heap(function(a, b) {
    return a.score - b.score;
  }));
  app.use(morgan('dev'));
  app.use(bodyParser());
  app.use(middle.cors);
  app.use(middle.logError);
  app.use(middle.handleError);
};
