const fs = require("fs");
const express = require("express");
const app = express();
const server = app.listen(80);

app.use(express.static(__dirname + '/public'));
app.use((req, res) => res.sendFile(__dirname + '/public/index.html'));

