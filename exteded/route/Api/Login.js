const fs = require("fs");
const Filter = require('../../util/Filter');

module.exports = (app, express, env) => {
  app.post('/api/v1/login', (req, res) => {
    const userInfo = env.documentRoot + '/users.json';
    if (!fs.existsSync(userInfo)) {
      res.json({
        status: 400,
      });
      return;
    }

    const expectedUserId = req.body.id || '';
    const expectedPassword = req.body.password || '';
    const data = JSON.parse(fs.readFileSync(userInfo, 'UTF-8') || '{}');

    for (const userId of Object.keys(data)) {
      const user = data[userId];
      if (userId === expectedUserId && user['password'] === expectedPassword) {
        req.session.user = user;
        res.json({
          status: 200,
          ...Filter.filterUserData(user)
        });
        return;
      }
    }
    res.json({
      status: 403,
      error: 'ID or Password are incorrect.'
    });
  });
};
