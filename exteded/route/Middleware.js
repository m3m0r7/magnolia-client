const bodyParser = require('body-parser');
const session = require('express-session');

module.exports = (app, express, env) => {
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());
};
