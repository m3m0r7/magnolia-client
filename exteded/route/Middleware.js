const bodyParser = require('body-parser');
const session = require('express-session');

module.exports = (app, express, env) => {
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());

// Use express-session
  app.use(session({
    secret: 'lily',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 24 * 30 * 1000
    },
    name: 'sid',
  }));
};
