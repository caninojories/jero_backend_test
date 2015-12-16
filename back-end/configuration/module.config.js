(function() {
  'use strict';

  var path      = require('path'),
      mongoose  = require('mongoose'),
      nunjucks  = require('nunjucks'),
      Promise   = require('bluebird'),
      rootPath  = path.normalize(__dirname + '/../../'),
      service   = '../services/';

  module.exports = {

    rootPath          : rootPath,
    authorize         : require(service + 'authorize'),
    clusterService    : require(service + './cluster'),
    config            : require('./settings.config'),
    User              : require('../model/User'),
    mongoDB           : require('../configuration/mongodb'),
    use_app           : require('./use_app.config'),
    use_api           : require('./use_api.config'),

    args              : require('yargs').argv,
    bodyParser        : require('body-parser'),
    chalk             : require('chalk'),
    cluster           : require('cluster'),
    compression       : require('compression'),
    express           : require('express'),
    expressSession    : require('express-session'),
    favicon           : require('serve-favicon'),
    jwt               : require('jwt-simple'),
    logger            : require('morgan'),
    methodOverride    : require('method-override'),
    moment            : require('moment'),
    mongoose          : Promise.promisifyAll(mongoose),
    multer            : require('multer'),
    numCPUs           : require('os').cpus().length,
    nunjucks          : require('nunjucks'),
    nunjucksEnv       : new nunjucks.Environment(new nunjucks.FileSystemLoader
      (path.join(rootPath, 'views'))),
    nunjucksEnvBuild  : new nunjucks.Environment(new nunjucks.FileSystemLoader
      (path.join(rootPath, 'build'))),
    Promise           : require('bluebird'),
    serveStatic       : require('serve-static'),
    url               : require('url'),
    _                 : require('underscore'),

    port              : process.env.PORT || 3003,
    environment       : 'development',

    faviconPath       : rootPath + 'front-end/resources/favicon.ico',
    nunjucksPath      : path.join(rootPath, 'front-end/views'),
    nunjucksPathBuild : path.join(rootPath, 'build'),
    css               : path.join(rootPath, 'front-end/resources/css'),
    fonts             : path.join(rootPath, 'front-end/resources/fonts'),
    img               : path.join(rootPath, 'front-end/resources/img'),
    js                : path.join(rootPath, 'front-end/resources/js'),
    compiledCss       : path.join(rootPath, 'front-end/.tmp'),
    bowerComponents   : path.join(rootPath, 'front-end/bower'),
    commonViews       : path.join(rootPath, 'front-end/views/commons'),

    buildCss          : path.join(rootPath, 'build/css'),
    buildFonts        : path.join(rootPath, 'build/fonts'),
    buildImg          : path.join(rootPath, 'build/img'),
    buildJs           : path.join(rootPath, 'build/js'),
    commonViewsBuild  : path.join(rootPath, 'build/common'),
    clientViewsBuild  : path.join(rootPath, 'front-end/views/client'),

    /* Classes */
    USER              : require('../classes/user.js'),
    User_Signup       : require('../classes/user.signup'),
    User_Stripe       : require('../classes/user.stripe'),
    User_Login        : require('../classes/user.login')
  };
}());
