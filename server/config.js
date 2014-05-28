var morgan     = require('morgan'),
    bodyParser = require('body-parser'),
    middle     = require('./middleware');

module.exports = exports = function(app, express, routers) {
  app.set('port', process.env.PORT || 9000);
  app.set('base url', 'http://eventsense.azurewebsites.net');
  app.use(morgan('dev'));
  app.use(bodyParser());
  app.use(middle.cors);
  app.use('/', routers.nexmoRouter);
  app.use(middle.logError);
  app.use(middle.handleError);
};
