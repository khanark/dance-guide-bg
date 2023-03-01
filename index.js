const express = require('express');
const CORS = require('cors');

const app = express();
const port = 3000;

const start = async () => {
  await require('./config/database')();
  app.use(express.json());
  app.use(CORS());
  app.listen(port, () => console.log(`Server is listening on port ${port}...`));
};

start();
