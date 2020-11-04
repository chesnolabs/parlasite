const express = require('express');
const chalk = require('chalk');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const config = require('../config');
const { i18n: _i18n, asyncRender: ar, formatDate } = require('./utils');
const { request } = require('express');

const i18n = _i18n(config.siteLang);

const app = express();

function setupExpress() {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-console
    console.log(`${chalk.magenta('| EXPRESS SERVER |')} - ${chalk.green('starting')}`);

    // disable "X-Powered-By: Express" header
    app.disable('x-powered-by');

    // set template renderer
    app.set('view engine', 'ejs');
    app.set('view options', {
      async: true,
    });
    app.locals.lang = config.siteLang;
    app.locals.i18n = i18n;
    app.locals.config = config;
    app.locals.sm = config.siteMap;
    app.locals.formatDate = formatDate;

    // serve static assets
    app.use(serveStatic('public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // i18n middleware
    app.use('*', function(req, res, next) {
      if (req.query.lang) {
        app.locals.i18n = _i18n(req.query.lang);
        app.locals.lang = req.query.lang;
      } else {
        req.query.lang = app.locals.lang;
      }
      next();
    });

    // eslint-disable-next-line global-require
    require('./routes')(app);

    // all other routes
    app.get('*', ar((render, req, res) => {
      res.status(404);
      render('error/404', {
        pageTitle: '404 Not Found',
        activeMenu: '',
      });
    }));

    // catch-all error handler (needs all 4 args)
    // eslint-disable-next-line no-unused-vars
    app.use((error, req, res, next) => {
      ar((render) => {
        // TODO: sentry
        console.log('error', error);
        res.status(500);
        render('error/500', {
          pageTitle: '500 Internal Server Error',
          activeMenu: '',
          error,
        });
      })(req, res, next);
    });

    // start listening on port
    const server = app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`${chalk.magenta('| EXPRESS SERVER |')} - ${chalk.green(`started on: http://localhost:${config.port}/`)}`);
      resolve();
    });

    server.on('error', (err) => {
      reject(err);
    });

    server.timeout = config.serverTimeout;
  });
}

function init() {
  return Promise.resolve()
    .then(setupExpress);
}

module.exports = {
  init,
  i18n,
};
