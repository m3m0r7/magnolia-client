const express = require("express");

const app = express();
const server = app.listen(80);

const env = {
  documentRoot: __dirname,
};

require('./exteded/route/Middleware')(app, express, env);
require('./exteded/route/Api/User')(app, express, env);
require('./exteded/route/Api/Login')(app, express, env);
require('./exteded/route/Api/Info')(app, express, env);
require('./exteded/route/Fallback')(app, express, env);
