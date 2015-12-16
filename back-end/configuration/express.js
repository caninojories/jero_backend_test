(function() {
  'use strict';

  /*Express Configuration*/
  module.exports = function(app) {
    io.nunjucksEnv.express(app);
    io.nunjucks.configure(io.nunjucksPath, {
      autoescape: true,
      express: app,
      watch: true,
      tags: {
        variableStart: '<$',
        variableEnd: '$>',
      }
    });

    app.set('x-powered-by', false);
    app.set('port', io.port);
    app.set('env', io.environment);
    app.set('view engine', 'html');
    app.use(io.compression());
    app.use(io.favicon(io.faviconPath));
    app.use(io.logger('dev'));
    app.use(io.bodyParser.urlencoded({
      extended: true
    }));
    app.use(io.bodyParser.json());
    app.use(io.methodOverride(function(req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
    }));

    app.set('json spaces', 2);
    app.set('view cache', true);
    app.use(function(req, res, next) {
      res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      next();
    });
    app.use('/fonts', io.express.static(io.fonts));
    app.use('/img', io.express.static(io.img));
    app.use('/js', io.express.static(io.js));
    app.use('/bower', io.serveStatic(io.bowerComponents));
    app.use('/commons', io.express.static(io.commonViews));
    app.use('/.tmp', io.express.static(io.compiledCss));

    /*Setup for CORS*/
    app.use(function(req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
      next();
    });

  };
}());
