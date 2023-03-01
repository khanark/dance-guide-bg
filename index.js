const express = require('express');
const CORS = require('cors');
const router = require('./config/routes');
const database = require('./config/database.js');

const app = express();
const port = 3000;

const start = async () => {
  app.use(express.json());
  app.use(CORS());

  await database();
  router(app);

  app.listen(port, () => console.log(`Server is listening on port ${port}...`));
};

start();
