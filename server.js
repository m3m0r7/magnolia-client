const fs = require("fs");
const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const Filter = require('./exteded/util/Filter');

const app = express();
const server = app.listen(80);

app.use(bodyParser.urlencoded({ extended: true }));
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

app.post('/api/v1/login', (req, res) => {
  const userInfo = __dirname + '/users.json';
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

app.use(express.static(__dirname + '/public'));
app.use((req, res) => res.sendFile(__dirname + '/public/index.html'));


