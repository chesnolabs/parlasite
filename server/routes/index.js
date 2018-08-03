const { siteMap: sm } = require('../../config');

/* eslint-disable global-require */
module.exports = (app) => {
  app.use('/', require('./landing'));

  app.use(`/${sm.landing.legislation}`, require('./zakonodaja'));
  app.use(`/${sm.landing.sessions}`, require('./seje'));
  app.use(`/${sm.landing.tools}`, require('./orodja'));

  app.use(`/${sm.member.base}`, require('./poslanec'));
  app.use(`/${sm.party.base}`, require('./poslanska-skupina'));
  app.use(`/${sm.session.base}`, require('./seja'));

  app.use('/api', require('./api'));
};
