require('dotenv').config();
require('./db').connect();

const usersEndpoint = require('./users-endpoint');
const reposEndpoint = require('./repos-endpoint');
const searchEndpoint = require('./search-endpoint');

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

app.use('/users', usersEndpoint);
app.use('/repos', reposEndpoint);
app.use('/search', searchEndpoint);

app.get('/ping', (req, res) => {
  res.json({ pong: true });
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(process.env.PORT || 3001);
