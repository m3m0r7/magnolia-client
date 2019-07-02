const Filter = require('../../util/Filter');

module.exports = (app, express, env) => {
  app.get('/api/v1/user', (req, res) => {
    if (!req.session.user) {
      res.json({
        status: 400,
        error: 'You did not logged-in.',
      });
      return;
    }
    let response = {};
    for (let key in req.session.user) {
      if (['password'].indexOf(key) !== -1) {
        continue;
      }
      response[key] = req.session.user[key];
    }
    res.json({
      status: 200,
      ...Filter.filterUserData(req.session.user),
    });
  });
};
