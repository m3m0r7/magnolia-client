const fs = require("fs");
const express = require("express");
const app = express();
const server = app.listen(80);

app.get('/api/v1/login', (req, res) => {
  const userInfo = __dirname + '/users.json';
  if (!fs.existsSync(userInfo)) {
    res.json({
      'status': 400,
    });
    return;
  }
  const data = fs.readFileSync(userInfo, 'UTF-8');
  res.json({
    'status': 200,
  });
});

app.use(express.static(__dirname + '/public'));
app.use((req, res) => res.sendFile(__dirname + '/public/index.html'));


